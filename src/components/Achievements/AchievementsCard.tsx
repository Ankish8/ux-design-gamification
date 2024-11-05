'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Zap,
  Award,
  Flame
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ACHIEVEMENT_CATEGORIES } from '../../config/constants';

const AchievementIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'pen':
      return <Trophy className="h-4 w-4" />;
    case 'paintbrush':
      return <Star className="h-4 w-4" />;
    case 'mousePointer':
      return <Zap className="h-4 w-4" />;
    case 'lightbulb':
      return <Award className="h-4 w-4" />;
    default:
      return <Flame className="h-4 w-4" />;
  }
};

export function AchievementsCard() {
  const { state } = useGamification();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(ACHIEVEMENT_CATEGORIES).map(([key, category]) => (
                <motion.div
                  key={key}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AchievementIcon type={category.iconType} />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {state.students.map(student => {
                          const categoryAchievements = student.achievements.filter(
                            a => a.category === key
                          );
                          return (
                            <div key={student.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{student.name}</span>
                                <Badge variant="outline">
                                  {categoryAchievements.length} unlocked
                                </Badge>
                              </div>
                              <Progress 
                                value={(categoryAchievements.length / 5) * 100} 
                                className="h-2"
                              />
                              <div className="flex flex-wrap gap-2">
                                {categoryAchievements.map(achievement => (
                                  <Badge 
                                    key={achievement.id}
                                    className={`${category.color} text-white`}
                                  >
                                    {achievement.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unlocked">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.students.map(student => (
                <Card key={student.id}>
                  <CardHeader>
                    <CardTitle>{student.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {student.achievements.map(achievement => (
                        <Badge 
                          key={achievement.id}
                          className={`${ACHIEVEMENT_CATEGORIES[achievement.category].color} text-white`}
                        >
                          <AchievementIcon 
                            type={ACHIEVEMENT_CATEGORIES[achievement.category].iconType}
                          />
                          <span className="ml-1">{achievement.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Complete more activities to unlock achievements!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}