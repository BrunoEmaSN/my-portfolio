/**
 * Computes age in years (level) and days until next birthday (nextLevel). Normalizes to midnight
 * to avoid timezone/hour drift; next birthday is same month/day as target in current or next year.
 */
export function getLevelAndNextLevel(targetDate: Date | string): {
  level: number
  nextLevel: number
} {
  const date = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const today = new Date()

  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const dateNorm = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  let level = todayNorm.getFullYear() - dateNorm.getFullYear()
  const thisYear =
    todayNorm.getMonth() > dateNorm.getMonth() ||
    (todayNorm.getMonth() === dateNorm.getMonth() && todayNorm.getDate() >= dateNorm.getDate())

  if (!thisYear) {
    level -= 1
  }

  let nextExperience = new Date(todayNorm.getFullYear(), dateNorm.getMonth(), dateNorm.getDate())
  if (nextExperience.getTime() < todayNorm.getTime()) {
    nextExperience = new Date(todayNorm.getFullYear() + 1, dateNorm.getMonth(), dateNorm.getDate())
  }

  const msPerDay = 24 * 60 * 60 * 1000
  const nextLevel = Math.floor((nextExperience.getTime() - todayNorm.getTime()) / msPerDay)

  return { level, nextLevel }
}
