'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from 'framer-motion';
import { SKILL_TREES } from '../../config/constants';

// Helper component for skill node connections
const SkillConnection = ({ active }: { active: boolean }) => (
  <div className="absolute w-px h-8 bg-gray-200 left-1/2 -translate-x-1/2 -top-8">
    <div 
      className={`w-full h-full transform origin-top ${
        active ? 'bg-primary' : 'bg-gray-200'
      }`}
    />
  </div>
);

function SkillNode({ 
  skill, 
  studentSkills, 
  studentPoints, 
  onUpgrade,
  parentSkillId
}: { 
  skill: any, 
  studentSkills: Record<string, number>,
  studentPoints: number,
  onUpgrade: (skillId: string) => void,
  parentSkillId?: string
}) {
  const currentLevel = studentSkills[skill.id] || 0;
  const parentLevel = parentSkillId ? (studentSkills[parentSkillId] || 0) : 999;
  const canUpgrade = currentLevel < skill.maxLevel && 
                     studentPoints >= skill.pointCost &&
                     (!parentSkillId || parentLevel > 0);

  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {parentSkillId && <SkillConnection active={parentLevel > 0} />}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className={`w-64 ${currentLevel > 0 ? 'border-primary' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <Badge variant="outline">
                    Lv. {currentLevel}/{skill.maxLevel}
                  </Badge>
                </div>
                <CardDescription>{skill.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={(currentLevel / skill.maxLevel) * 100} />
                  <Button
                    onClick={() => onUpgrade(skill.id)}
                    disabled={!canUpgrade}
                    className="w-full"
                  >
                    Upgrade ({skill.pointCost} points)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            {!canUpgrade && currentLevel >= skill.maxLevel ? (
              "Maximum level reached"
            ) : !canUpgrade && parentSkillId && parentLevel === 0 ? (
              `Requires ${parentSkillId} to be unlocked first`
            ) : !canUpgrade ? (
              `Need ${skill.pointCost} points to upgrade`
            ) : (
              `Upgrade to level ${currentLevel + 1}`
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}

export function SkillTreeCard() {
  const { state, dispatch } = useGamification();

  const handleUpgrade = (studentId: number, skillId: string, treeName: string) => {
    const tree = SKILL_TREES[treeName];
    const skill = tree.skills.find(s => s.id === skillId);
    
    if (skill) {
      dispatch({
        type: 'UPGRADE_SKILL',
        payload: { 
          studentId, 
          skillId,
          pointCost: skill.pointCost
        }
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: `Skill ${skill.name} upgraded!`
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skill Trees</CardTitle>
        <CardDescription>
          Upgrade your skills and unlock new abilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={Object.keys(SKILL_TREES)[0]} className="w-full">
          <TabsList className="grid w-full" style={{ 
            gridTemplateColumns: `repeat(${Object.keys(SKILL_TREES).length}, 1fr)` 
          }}>
            {Object.entries(SKILL_TREES).map(([key, tree]) => (
              <TabsTrigger key={key} value={key}>
                {tree.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(SKILL_TREES).map(([treeKey, tree]) => (
            <TabsContent key={treeKey} value={treeKey}>
              <div className="space-y-8">
                {state.students.map(student => (
                  <Card key={student.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{student.name}</CardTitle>
                        <Badge variant="secondary">
                          {student.points} points available
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center space-y-12">
                        {tree.skills.map((skill, index) => (
                          <SkillNode
                            key={skill.id}
                            skill={skill}
                            studentSkills={student.skills}
                            studentPoints={student.points}
                            onUpgrade={(skillId) => handleUpgrade(student.id, skillId, treeKey)}
                            parentSkillId={index > 0 ? tree.skills[index - 1].id : undefined}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}