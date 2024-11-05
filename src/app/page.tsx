'use client'

import React from 'react';
import { Header } from '../components/Layout/Header';
import { useGamification } from '../context/GamificationContext';
import StudentTable from '../components/StudentTable/StudentTable';
import { LeaderboardCard } from '../components/Leaderboard/LeaderboardCard';
import { AchievementsCard } from '../components/Achievements/AchievementsCard';
import { PowerUpsCard } from '../components/PowerUps/PowerUpsCard';
import { SkillTreeCard } from '../components/Skills/SkillTreeCard';
import { GamificationProvider } from '../context/GamificationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Dashboard() {
  const { state } = useGamification();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 space-y-8">
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="powerups">Power-ups</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LeaderboardCard />
              <Card>
                <CardHeader>
                  <CardTitle>Class Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-primary/10">
                        <h3 className="text-sm font-medium">Total Students</h3>
                        <p className="text-2xl font-bold">{state.students.length}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10">
                        <h3 className="text-sm font-medium">Average Points</h3>
                        <p className="text-2xl font-bold">
                          {(state.students.reduce((acc, s) => acc + s.points, 0) / state.students.length).toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-primary/10">
                        <h3 className="text-sm font-medium">Active Streaks</h3>
                        <p className="text-2xl font-bold">
                          {state.students.filter(s => s.streak > 0).length} students
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/10">
                        <h3 className="text-sm font-medium">Total Skills Upgraded</h3>
                        <p className="text-2xl font-bold">
                          {state.students.reduce((acc, s) => 
                            acc + Object.values(s.skills).reduce((sum, level) => sum + level, 0), 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsCard />
          </TabsContent>

          <TabsContent value="powerups">
            <PowerUpsCard />
          </TabsContent>

          <TabsContent value="skills">
            <SkillTreeCard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <GamificationProvider>
      <Dashboard />
    </GamificationProvider>
  );
}