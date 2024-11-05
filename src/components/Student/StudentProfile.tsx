'use client'

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Student } from '../../types';
import { 
  calculateLevelProgress, 
  calculateStudentStats,
  formatPoints 
} from '../../utils/calculations';
import { Trophy, Star, Clock, Award } from 'lucide-react';

interface StudentProfileProps {
  student: Student;
}

export function StudentProfile({ student }: StudentProfileProps) {
  const stats = calculateStudentStats(student);
  const levelProgress = calculateLevelProgress(student.points);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <CardDescription>Level {student.level} Student</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary" className="text-lg">
                  {formatPoints(student.points)} points
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Current points balance
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level Progress</span>
            <span>{Math.round(levelProgress)}%</span>
          </div>
          <Progress value={levelProgress} />
        </div>

        {/* Achievement Showcase */}
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Achievements</h3>
          <div className="flex flex-wrap gap-2">
            {student.achievements.slice(-3).map(achievement => (
              <Badge 
                key={achievement.id} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                <Award className="h-3 w-3" />
                {achievement.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Best Streak</span>
            </div>
            <p className="text-2xl font-bold">{stats.highestStreak} days</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Achievements</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalAchievements}</p>
          </div>
        </div>

        {/* Active Power-ups */}
        {student.activePowerUps.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Active Power-ups</h3>
            <div className="flex flex-wrap gap-2">
              {student.activePowerUps.map(powerUp => (
                <Badge 
                  key={powerUp.id}
                  className="flex items-center gap-1"
                >
                  <Clock className="h-3 w-3" />
                  {powerUp.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Subject Performance */}
        <div>
          <h3 className="text-sm font-medium mb-2">Subject Performance</h3>
          <div className="space-y-2">
            {Object.entries(student.subjectPerformance).map(([subject, score]) => (
              <div key={subject} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{subject}</span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}