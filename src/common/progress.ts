export function calculateProgress(completedLessons: number, totalLessons: number): number {
  if (totalLessons <= 0) return 0;
  const safeCompleted = Math.min(Math.max(completedLessons, 0), totalLessons);
  return Number(((safeCompleted / totalLessons) * 100).toFixed(2));
}
