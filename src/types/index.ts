// Types for achievements
export interface Achievement {
    id: string;
    name: string;
    category: string;
    description?: string;
  }
  
  // Types for power-ups
  export interface PowerUp {
    id: string;
    name: string;
    description: string;
    cost: number;
    duration?: number;
    expiresAt?: number;
  }
  
  // Type for point history entries
  export interface PointHistory {
    date: string;
    points: number;
  }
  
  // Types for subject performance
  export interface SubjectPerformance {
    uxDesign: number;
    visualDesign: number;
    interactionDesign: number;
    designThinking: number;
  }
  
  // Types for skill definitions
  export interface Skill {
    id: string;
    name: string;
    description: string;
    level: number;
    maxLevel: number;
    pointCost: number;
    requires?: string;
  }
  
  // Types for skill tree structure
  export interface SkillTree {
    name: string;
    description: string;
    color: string;
    skills: Skill[];
  }
  
  // The main student type that brings everything together
  export interface Student {
    id: number;
    name: string;
    points: number;
    level: number;
    achievements: Achievement[];
    skills: Record<string, number>;  // Maps skill IDs to their levels
    streak: number;
    multiplier: number;
    activePowerUps: PowerUp[];
    pointsHistory: PointHistory[];
    subjectPerformance: SubjectPerformance;
  }
  
  // Theme definition
  export interface Theme {
    name: string;
    className: string;
    icon: string;
  }
  
  // Notification type
  export interface Notification {
    id: number;
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning';
    timestamp?: number;
  }
  
  // Component prop types
  export interface StudentRowProps {
    student: Student;
    onPointsChange: (id: number, points: number) => void;
  }
  
  export interface SkillNodeProps {
    skill: Skill;
    studentSkills: Record<string, number>;
    studentPoints: number;
    onUpgrade: (skillId: string) => void;
    parentSkillId?: string;
  }
  
  export interface PowerUpCardProps {
    powerUp: PowerUp;
    student: Student;
    onPurchase: (studentId: number, powerUpId: string) => void;
  }
  
  export interface AchievementCardProps {
    achievement: Achievement;
    category: string;
    student: Student;
  }
  
  // Stats and analytics types
  export interface StudentStats {
    totalPoints: number;
    averagePoints: number;
    highestStreak: number;
    totalAchievements: number;
    skillLevels: {
      [key: string]: number;
    };
  }
  
  export interface ClassStats {
    totalStudents: number;
    averagePoints: number;
    activeStreaks: number;
    totalSkillUpgrades: number;
    topPerformer: string;
    mostCommonAchievement: string;
  }
  
  // Action result types
  export interface UpgradeResult {
    success: boolean;
    message: string;
    newLevel?: number;
    pointsRemaining?: number;
  }
  
  export interface PowerUpResult {
    success: boolean;
    message: string;
    expiresAt?: number;
    pointsRemaining?: number;
  }