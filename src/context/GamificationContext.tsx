'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Student, PowerUp, Achievement } from '../types';

interface GamificationState {
  students: Student[];
  customAchievements: Achievement[];
  notifications: { id: number; message: string }[];
  theme: string;
}

type GamificationAction =
  | { type: 'UPDATE_POINTS'; payload: { id: number; points: number } }
  | { type: 'PURCHASE_POWERUP'; payload: { studentId: number; powerUp: PowerUp } }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'ADD_NOTIFICATION'; payload: string }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'UPGRADE_SKILL'; payload: { studentId: number; skillId: string; pointCost: number } }
  | { type: 'ADD_STUDENT'; payload: Student }
  | { type: 'UPDATE_STREAK'; payload: { studentId: number; increment: boolean } };

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    points: 50,
    level: 1,
    achievements: [
      { id: "quick_learner", name: "Quick Learner", category: "uxDesign" },
      { id: "helpful_peer", name: "Helpful Peer", category: "visualDesign" }
    ],
    skills: {
      ux_research: 1,
      wireframing: 0,
      usability: 0,
      color_theory: 1,
      typography: 0
    },
    streak: 3,
    multiplier: 1,
    activePowerUps: [],
    pointsHistory: [
      { date: '2024-05-01', points: 10 },
      { date: '2024-05-02', points: 15 },
      { date: '2024-05-03', points: 25 },
    ],
    subjectPerformance: {
      uxDesign: 80,
      visualDesign: 65,
      interactionDesign: 90,
      designThinking: 75,
    }
  },
  {
    id: 2,
    name: "Bob Smith",
    points: 75,
    level: 2,
    achievements: [
      { id: "design_master", name: "Design Master", category: "visualDesign" }
    ],
    skills: {
      ux_research: 2,
      wireframing: 1,
      color_theory: 2,
      typography: 1
    },
    streak: 5,
    multiplier: 1.1,
    activePowerUps: [],
    pointsHistory: [
      { date: '2024-05-01', points: 20 },
      { date: '2024-05-02', points: 45 },
      { date: '2024-05-03', points: 75 },
    ],
    subjectPerformance: {
      uxDesign: 85,
      visualDesign: 90,
      interactionDesign: 75,
      designThinking: 80,
    }
  },
  {
    id: 3,
    name: "Charlie Davis",
    points: 100,
    level: 2,
    achievements: [
      { id: "innovation_star", name: "Innovation Star", category: "interactionDesign" }
    ],
    skills: {
      micro_interactions: 2,
      animation: 1,
      gesture: 0
    },
    streak: 7,
    multiplier: 1.2,
    activePowerUps: [],
    pointsHistory: [
      { date: '2024-05-01', points: 30 },
      { date: '2024-05-02', points: 65 },
      { date: '2024-05-03', points: 100 },
    ],
    subjectPerformance: {
      uxDesign: 70,
      visualDesign: 75,
      interactionDesign: 95,
      designThinking: 85,
    }
  }
];

const initialState: GamificationState = {
  students: initialStudents,
  customAchievements: [],
  notifications: [],
  theme: 'light',
};

function calculateMultiplier(streak: number): number {
  if (streak >= 30) return 1.5;
  if (streak >= 10) return 1.2;
  if (streak >= 5) return 1.1;
  return 1;
}

function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    case 'UPDATE_POINTS':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id
            ? {
                ...student,
                points: Math.max(0, student.points + action.payload.points),
                pointsHistory: [
                  ...student.pointsHistory,
                  { date: new Date().toISOString().split('T')[0], points: student.points + action.payload.points }
                ].slice(-30) // Keep last 30 days
              }
            : student
        ),
      };

    case 'PURCHASE_POWERUP':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.studentId
            ? {
                ...student,
                points: student.points - action.payload.powerUp.cost,
                activePowerUps: [
                  ...student.activePowerUps,
                  {
                    ...action.payload.powerUp,
                    expiresAt: Date.now() + (action.payload.powerUp.duration || 0),
                  },
                ],
              }
            : student
        ),
      };

    case 'UPGRADE_SKILL':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.studentId
            ? {
                ...student,
                points: student.points - action.payload.pointCost,
                skills: {
                  ...student.skills,
                  [action.payload.skillId]: (student.skills[action.payload.skillId] || 0) + 1,
                },
              }
            : student
        ),
      };

    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        customAchievements: [...state.customAchievements, action.payload],
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          { id: Date.now(), message: action.payload },
          ...state.notifications,
        ].slice(0, 10), // Keep only last 10 notifications
      };

    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };

    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case 'UPDATE_STREAK':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.studentId
            ? {
                ...student,
                streak: action.payload.increment ? student.streak + 1 : 0,
                multiplier: action.payload.increment 
                  ? calculateMultiplier(student.streak + 1)
                  : 1
              }
            : student
        ),
      };

    default:
      return state;
  }
}

const GamificationContext = createContext<{
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
} | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, initialState);

  return (
    <GamificationContext.Provider value={{ state, dispatch }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}