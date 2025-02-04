export function calculatePercentage(total: number, discovered: number): string {
  if (total === 0) return "0%"; // Avoid division by zero and return 0%

  const percentage = (discovered / total) * 100;

  // If the percentage is exactly 100, return "100%" without decimal
  if (percentage === 100) {
    return "100";
  }

  // Otherwise, return the percentage rounded to 1 decimal place
  return `${percentage.toFixed(1)}`;
}
