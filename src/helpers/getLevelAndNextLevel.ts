/**
 * Calcula la edad y los días hasta el próximo cumpleaños.
 * @param targetDate - Fecha de objetivo (Date o string ISO/parseable)
 * @returns { level, nextLevel }
 */
export function getLevelAndNextLevel(targetDate: Date | string): {
  level: number
  nextLevel: number
} {
  const date = typeof targetDate === "string" ? new Date(targetDate) : targetDate
  const today = new Date()

  // Ajustar a medianoche para evitar desfases por hora
  const todayNorm = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const dateNorm = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  let level = todayNorm.getFullYear() - dateNorm.getFullYear()
  const thisYear =
    todayNorm.getMonth() > dateNorm.getMonth() ||
    (todayNorm.getMonth() === dateNorm.getMonth() && todayNorm.getDate() >= dateNorm.getDate())

  if (!thisYear) {
    level -= 1
  }

  // Próximo objetivo: mismo mes y día que target, año = este año o el siguiente
  let nextExperience = new Date(todayNorm.getFullYear(), dateNorm.getMonth(), dateNorm.getDate())
  if (nextExperience.getTime() < todayNorm.getTime()) {
    nextExperience = new Date(todayNorm.getFullYear() + 1, dateNorm.getMonth(), dateNorm.getDate())
  }

  const msPerDay = 24 * 60 * 60 * 1000
  const nextLevel = Math.floor((nextExperience.getTime() - todayNorm.getTime()) / msPerDay)

  return { level, nextLevel }
}
