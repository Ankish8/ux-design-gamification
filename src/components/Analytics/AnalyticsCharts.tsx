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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChart } from 'recharts';

export function AnalyticsCharts() {
  const { state } = useGamification();

  // Prepare points history data
  const pointsData = state.students[0]?.pointsHistory.map(history => ({
    date: new Date(history.date).toLocaleDateString(),
    ...state.students.reduce((acc, student) => {
      const points = student.pointsHistory.find(h => h.date === history.date)?.points || 0;
      return { ...acc, [student.name]: points };
    }, {})
  })) || [];

  // Prepare skill distribution data
  const skillData = Object.entries(
    state.students.reduce((acc, student) => {
      Object.entries(student.skills).forEach(([skill, level]) => {
        acc[skill] = (acc[skill] || 0) + level;
      });
      return acc;
    }, {} as Record<string, number>)
  ).map(([skill, total]) => ({
    name: skill,
    value: total
  }));

  // Prepare subject performance data
  const subjectData = Object.keys(state.students[0]?.subjectPerformance || {}).map(subject => ({
    subject,
    ...state.students.reduce((acc, student) => ({
      ...acc,
      [student.name]: student.subjectPerformance[subject]
    }), {})
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analytics Dashboard</CardTitle>
        <CardDescription>
          Visualize student progress and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="points" className="space-y-4">
          <TabsList>
            <TabsTrigger value="points">Points Progress</TabsTrigger>
            <TabsTrigger value="skills">Skill Distribution</TabsTrigger>
            <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle>Points Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pointsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {state.students.map(student => (
                      <Line
                        key={student.id}
                        type="monotone"
                        dataKey={student.name}
                        stroke={`hsl(${student.id * 100}, 70%, 50%)`}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skill Level Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {skillData.map((entry, index) => (
                        <Cell 
                          key={index} 
                          fill={`hsl(${index * 45}, 70%, 50%)`} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {state.students.map(student => (
                      <Bar
                        key={student.id}
                        dataKey={student.name}
                        fill={`hsl(${student.id * 100}, 70%, 50%)`}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}