'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Star, Zap } from 'lucide-react';
import { calculateClassStats } from '../../utils/calculations';

export function StatsOverview() {
  const { state } = useGamification();
  const stats = calculateClassStats(state.students);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon,
    description 
  }: { 
    title: string; 
    value: string | number;
    icon: any;
    description?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value={stats.totalStudents}
        icon={Users}
        description="Active participants"
      />
      <StatCard
        title="Average Points"
        value={Math.round(stats.averagePoints)}
        icon={Star}
        description="Per student"
      />
      <StatCard
        title="Active Streaks"
        value={stats.activeStreaks}
        icon={Zap}
        description="Students with ongoing streaks"
      />
      <StatCard
        title="Top Performer"
        value={stats.topPerformer}
        icon={Trophy}
        description="Current leader"
      />
    </div>
  );
}