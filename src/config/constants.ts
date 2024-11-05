import React from 'react';
import { Pen, Paintbrush, MousePointer, Lightbulb } from 'lucide-react';

export const ACHIEVEMENT_CATEGORIES = {
  uxDesign: {
    name: "UX Design",
    iconType: "pen",
    color: "bg-blue-500",
  },
  visualDesign: {
    name: "Visual Design",
    iconType: "paintbrush",
    color: "bg-green-500",
  },
  interactionDesign: {
    name: "Interaction Design",
    iconType: "mousePointer",
    color: "bg-yellow-500",
  },
  designThinking: {
    name: "Design Thinking",
    iconType: "lightbulb",
    color: "bg-purple-500",
  },
};

export const POWER_UPS = [
  {
    id: 'doublePoints',
    name: 'Double Points',
    description: 'Double your points for the next 30 minutes',
    cost: 50,
    duration: 30 * 60 * 1000,
  },
  {
    id: 'instantLevel',
    name: 'Instant Level Up',
    description: 'Instantly level up one skill of your choice',
    cost: 100,
  },
  {
    id: 'bonusStreak',
    name: 'Bonus Streak',
    description: 'Add 3 days to your current streak',
    cost: 75,
  },
];

export const LEVEL_THRESHOLDS = [0, 50, 100, 200, 350, 500];

export const STREAK_BADGES = [
  { days: 5, name: "5-Day Streak", icon: "🔥" },
  { days: 10, name: "10-Day Streak", icon: "🔥🔥" },
  { days: 30, name: "30-Day Streak", icon: "🔥🔥🔥" },
];

export const ENCOURAGEMENT_MESSAGES = [
  "Great job! Keep up the good work!",
  "You're making excellent progress!",
  "Your hard work is paying off!",
  "You're on fire! 🔥 Keep that streak going!",
  "Impressive skills! You're becoming a master!",
  "Your dedication is inspiring!",
  "You're crushing it! 💪 Stay motivated!",
];

export const THEMES = {
  light: {
    name: "Light",
    className: "light",
    icon: "☀️",
  },
  dark: {
    name: "Dark",
    className: "dark",
    icon: "🌙",
  },
};

export const SKILL_TREES = {
  uxDesign: {
    name: "UX Design",
    description: "Master the art of user experience design",
    color: "bg-blue-500",
    skills: [
      {
        id: "ux_research",
        name: "User Research",
        description: "Learn to conduct effective user research",
        level: 0,
        maxLevel: 3,
        pointCost: 20,
      },
      {
        id: "wireframing",
        name: "Wireframing",
        description: "Create effective wireframes and prototypes",
        level: 0,
        maxLevel: 3,
        pointCost: 30,
        requires: "ux_research"
      },
      {
        id: "usability",
        name: "Usability Testing",
        description: "Conduct and analyze usability tests",
        level: 0,
        maxLevel: 3,
        pointCost: 40,
        requires: "wireframing"
      }
    ]
  },
  visualDesign: {
    name: "Visual Design",
    description: "Create beautiful and functional designs",
    color: "bg-green-500",
    skills: [
      {
        id: "color_theory",
        name: "Color Theory",
        description: "Master color combinations and meanings",
        level: 0,
        maxLevel: 3,
        pointCost: 20,
      },
      {
        id: "typography",
        name: "Typography",
        description: "Learn effective use of fonts and text",
        level: 0,
        maxLevel: 3,
        pointCost: 30,
        requires: "color_theory"
      },
      {
        id: "layout",
        name: "Layout Design",
        description: "Create balanced and effective layouts",
        level: 0,
        maxLevel: 3,
        pointCost: 40,
        requires: "typography"
      }
    ]
  },
  interaction: {
    name: "Interaction Design",
    description: "Create engaging interactive experiences",
    color: "bg-purple-500",
    skills: [
      {
        id: "micro_interactions",
        name: "Micro-interactions",
        description: "Design small, engaging interactions",
        level: 0,
        maxLevel: 3,
        pointCost: 20,
      },
      {
        id: "animation",
        name: "Animation",
        description: "Create smooth and meaningful animations",
        level: 0,
        maxLevel: 3,
        pointCost: 30,
        requires: "micro_interactions"
      },
      {
        id: "gesture",
        name: "Gesture Design",
        description: "Design intuitive touch and gesture interactions",
        level: 0,
        maxLevel: 3,
        pointCost: 40,
        requires: "animation"
      }
    ]
  }
};

// Analytics constants
export const CHART_COLORS = {
  primary: 'hsl(210, 100%, 50%)',
  secondary: 'hsl(160, 100%, 50%)',
  tertiary: 'hsl(260, 100%, 50%)',
  quaternary: 'hsl(310, 100%, 50%)',
};

export const TIME_PERIODS = {
  day: '24h',
  week: '7d',
  month: '30d',
  year: '1y',
};

export const DEFAULT_ANIMATION_DURATION = 300;

// Achievement reward tiers
export const ACHIEVEMENT_TIERS = {
  bronze: {
    name: 'Bronze',
    color: 'bg-amber-600',
    pointReward: 50,
  },
  silver: {
    name: 'Silver',
    color: 'bg-gray-400',
    pointReward: 100,
  },
  gold: {
    name: 'Gold',
    color: 'bg-yellow-400',
    pointReward: 200,
  },
};

// Notification types
export const NOTIFICATION_TYPES = {
  achievement: 'achievement',
  levelUp: 'levelUp',
  reward: 'reward',
  streak: 'streak',
  skill: 'skill',
};