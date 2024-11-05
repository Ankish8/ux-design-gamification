import { Student, StudentStats, ClassStats, PowerUp } from '../types';

// Calculate student level based on points
export function calculateLevel(points: number): number {
  const levels = [0, 50, 100, 200, 350, 500, 750, 1000];
  return levels.findIndex(threshold => points < threshold) - 1;
}

// Calculate progress to next level as percentage
export function calculateLevelProgress(points: number): number {
  const levels = [0, 50, 100, 200, 350, 500, 750, 1000];
  const currentLevel = calculateLevel(points);
  const currentThreshold = levels[currentLevel];
  const nextThreshold = levels[currentLevel + 1];
  
  return ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
}

// Calculate streak multiplier
export function calculateMultiplier(streak: number): number {
  if (streak >= 30) return 1.5;
  if (streak >= 10) return 1.2;
  if (streak >= 5) return 1.1;
  return 1;
}

// Calculate points with active power-ups
export function calculatePointsWithPowerUps(
  basePoints: number, 
  powerUps: PowerUp[]
): number {
  let multiplier = 1;
  const now = Date.now();

  powerUps.forEach(powerUp => {
    if (powerUp.id === 'doublePoints' && powerUp.expiresAt && powerUp.expiresAt > now) {
      multiplier *= 2;
    }
  });

  return Math.round(basePoints * multiplier);
}

// Calculate student statistics
export function calculateStudentStats(student: Student): StudentStats {
  return {
    totalPoints: student.points,
    averagePoints: student.pointsHistory.reduce((sum, p) => sum + p.points, 0) / 
                  student.pointsHistory.length,
    highestStreak: student.streak,
    totalAchievements: student.achievements.length,
    skillLevels: student.skills
  };
}

// Calculate class statistics
export function calculateClassStats(students: Student[]): ClassStats {
  const totalPoints = students.reduce((sum, s) => sum + s.points, 0);
  const topStudent = students.reduce((top, s) => s.points > top.points ? s : top);
  
  // Count achievements
  const achievementCounts = new Map<string, number>();
  students.forEach(student => {
    student.achievements.forEach(achievement => {
      achievementCounts.set(
        achievement.name,
        (achievementCounts.get(achievement.name) || 0) + 1
      );
    });
  });

  // Find most common achievement
  let mostCommon = { name: '', count: 0 };
  achievementCounts.forEach((count, name) => {
    if (count > mostCommon.count) {
      mostCommon = { name, count };
    }
  });

  return {
    totalStudents: students.length,
    averagePoints: totalPoints / students.length,
    activeStreaks: students.filter(s => s.streak > 0).length,
    totalSkillUpgrades: students.reduce(
      (sum, s) => sum + Object.values(s.skills).reduce((a, b) => a + b, 0),
      0
    ),
    topPerformer: topStudent.name,
    mostCommonAchievement: mostCommon.name
  };
}

// Format time remaining for power-ups
export function formatTimeRemaining(expiresAt: number): string {
  const remaining = Math.max(0, expiresAt - Date.now());
  const minutes = Math.floor(remaining / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Check if a skill can be upgraded
export function canUpgradeSkill(
  student: Student,
  skillId: string,
  pointCost: number,
  maxLevel: number,
  requiredSkillId?: string
): boolean {
  const currentLevel = student.skills[skillId] || 0;
  const hasPoints = student.points >= pointCost;
  const belowMax = currentLevel < maxLevel;
  const meetsPrerequisite = !requiredSkillId || (student.skills[requiredSkillId] || 0) > 0;

  return hasPoints && belowMax && meetsPrerequisite;
}

// Format points with appropriate suffix (K, M, etc.)
export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}