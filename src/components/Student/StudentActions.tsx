'use client'

import React from 'react';
import { useGamification } from '../../context/GamificationContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Award,
  Trophy,
  Star,
  Gift,
  Plus,
  UserPlus,
  FileEdit,
  Trash2
} from 'lucide-react';

export function StudentActions() {
  const { state, dispatch } = useGamification();

  const handleAddStudent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    
    if (name) {
      const newStudent = {
        id: Date.now(),
        name,
        points: 0,
        level: 1,
        achievements: [],
        skills: {},
        streak: 0,
        multiplier: 1,
        activePowerUps: [],
        pointsHistory: [{
          date: new Date().toISOString().split('T')[0],
          points: 0
        }],
        subjectPerformance: {
          uxDesign: 0,
          visualDesign: 0,
          interactionDesign: 0,
          designThinking: 0
        }
      };

      dispatch({
        type: 'ADD_STUDENT',
        payload: newStudent
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: `New student ${name} added to the class`
      });
    }
  };

  const handleAwardPoints = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentId = Number(formData.get('studentId'));
    const points = Number(formData.get('points'));
    
    if (studentId && points) {
      dispatch({
        type: 'UPDATE_POINTS',
        payload: { id: studentId, points }
      });

      const student = state.students.find(s => s.id === studentId);
      if (student) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: `Awarded ${points} points to ${student.name}`
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details of the new student.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input id="name" name="name" placeholder="Enter student name" required />
                </div>
                <Button type="submit">Add Student</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Trophy className="mr-2 h-4 w-4" />
                Award Points
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Award Points</DialogTitle>
                <DialogDescription>
                  Select a student and enter points to award.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAwardPoints} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student</Label>
                  <select 
                    id="studentId" 
                    name="studentId"
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select student</option>
                    {state.students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input 
                    id="points" 
                    name="points" 
                    type="number" 
                    placeholder="Enter points"
                    required
                  />
                </div>
                <Button type="submit">Award Points</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Award className="mr-2 h-4 w-4" />
                Add Achievement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Achievement</DialogTitle>
                <DialogDescription>
                  Create a new achievement for students.
                </DialogDescription>
              </DialogHeader>
              {/* Achievement form here */}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Add Reward
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Reward</DialogTitle>
                <DialogDescription>
                  Create a new reward for students to unlock.
                </DialogDescription>
              </DialogHeader>
              {/* Reward form here */}
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}