'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Student } from '../../types';
import { 
  Trophy, 
  Star, 
  Zap, 
  TrendingUp,
  Medal,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateLevelProgress } from '../../utils/calculations';

interface StudentSummaryProps {
  student: Student;
  showDetails?: boolean;
}

export function StudentSummary({ student, showDetails = false }: StudentSummaryProps) {
  const levelProgress = calculateLevelProgress(student.points);

  const StatBadge = ({ icon: Icon, value, label }: { 
    icon: any; 
    value: string | number; 
    label: string 
  }) => (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex flex-col">
        <span className="text-sm font-medium">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{student.name}</CardTitle>
              <CardDescription>Level {student.level} Student</CardDescription>
            </div>
            <Badge variant="secondary">{student.points} points</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Level Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Level Progress</span>
                <span>{Math.round(levelProgress)}%</span>
              </div>
              <Progress value={levelProgress} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <StatBadge 
                icon={Trophy} 
                value={student.streak} 
                label="Day Streak" 
              />
              <StatBadge 
                icon={Star} 
                value={student.achievements.length} 
                label="Achievements" 
              />
              <StatBadge 
                icon={Zap} 
                value={`${student.multiplier}x`} 
                label="Multiplier" 
              />
            </div>

            {/* Active Power-ups */}
            {student.activePowerUps.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Active Power-ups</h4>
                <div className="flex flex-wrap gap-2">
                  {student.activePowerUps.map(powerUp => (
                    <Badge 
                      key={powerUp.id}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {powerUp.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Achievements */}
            {showDetails && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {student.achievements.slice(-3).map(achievement => (
                    <Badge 
                      key={achievement.id}
                      className="flex items-center gap-1"
                    >
                      <Medal className="h-3 w-3" />
                      {achievement.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Trend */}
            {showDetails && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Performance Trend</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Last 7 days</span>
                  <span className="text-green-500">+{
                    student.pointsHistory
                      .slice(-7)
                      .reduce((acc, curr) => acc + curr.points, 0)
                  } points</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}