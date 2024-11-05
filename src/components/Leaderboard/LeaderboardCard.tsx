'use client'

import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGamification } from '../../context/GamificationContext';

export function LeaderboardCard() {
  const { state } = useGamification();
  const sortedStudents = [...state.students].sort((a, b) => b.points - a.points);

  const getRankInfo = (index: number) => {
    switch(index) {
      case 0:
        return { 
          icon: <Trophy className="h-6 w-6 text-yellow-500" />,
          className: "bg-yellow-100"
        };
      case 1:
        return { 
          icon: <Medal className="h-6 w-6 text-gray-400" />,
          className: "bg-gray-100"
        };
      case 2:
        return { 
          icon: <Award className="h-6 w-6 text-amber-600" />,
          className: "bg-amber-100"
        };
      default:
        return { 
          icon: `#${index + 1}`,
          className: "bg-white"
        };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedStudents.slice(0, 5).map((student, index) => {
            const rankInfo = getRankInfo(index);
            return (
              <div
                key={student.id}
                className={`flex items-center justify-between p-3 rounded-lg ${rankInfo.className}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8">
                    {typeof rankInfo.icon === 'string' ? rankInfo.icon : rankInfo.icon}
                  </div>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">Level {student.level}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Badge variant="secondary" className="text-lg">
                    {student.points}
                  </Badge>
                  {student.streak > 0 && (
                    <span className="text-sm text-muted-foreground">
                      🔥 {student.streak} days
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}