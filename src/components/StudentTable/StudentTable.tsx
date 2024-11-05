'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LEVEL_THRESHOLDS } from '../../config/constants';

export function StudentTable() {
  const { state, dispatch } = useGamification();

  const handlePointsChange = (studentId: number, change: number) => {
    dispatch({
      type: 'UPDATE_POINTS',
      payload: { id: studentId, points: change }
    });
  };

  const calculateProgress = (points: number, level: number) => {
    const currentThreshold = LEVEL_THRESHOLDS[level];
    const nextThreshold = LEVEL_THRESHOLDS[level + 1];
    return ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Streak</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{student.points}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Level {student.level}</Badge>
                  <Progress 
                    value={calculateProgress(student.points, student.level)} 
                    className="w-[60px]"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{student.streak} days</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePointsChange(student.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePointsChange(student.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}