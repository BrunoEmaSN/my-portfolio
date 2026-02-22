import { useMemo } from "react";

const DAY_LABELS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Ciclo lunar sinódico en días (luna nueva a luna nueva). */
const LUNAR_CYCLE_DAYS = 29.530588;

/** Luna llena de referencia para Argentina (3 Mar 2026, 08:39 Argentina ≈ 11:39 UTC). */
const REFERENCE_FULL_MOON_MS = Date.UTC(2026, 2, 3, 11, 39);

/**
 * Cuenta cuántos días faltan para la próxima luna llena desde la fecha dada.
 * Cálculo válido para cualquier zona horaria; se usa referencia alineada al calendario argentino.
 */
function getDaysUntilFullMoon(from: Date): number {
  const fromMs = from.getTime();
  const daysSinceRef = (fromMs - REFERENCE_FULL_MOON_MS) / (24 * 60 * 60 * 1000);
  const cyclesSince = daysSinceRef / LUNAR_CYCLE_DAYS;
  const nextFullMoonCycles = Math.ceil(cyclesSince);
  const nextFullMoonMs = REFERENCE_FULL_MOON_MS + nextFullMoonCycles * LUNAR_CYCLE_DAYS * 24 * 60 * 60 * 1000;
  const daysUntil = Math.round((nextFullMoonMs - fromMs) / (24 * 60 * 60 * 1000));
  if (daysUntil <= 0) return Math.round(LUNAR_CYCLE_DAYS);
  return daysUntil;
}

/**
 * Días transcurridos desde la última luna nueva (0 a ~29.53).
 */
function getDaysSinceNewMoon(from: Date): number {
  const newMoonBeforeRef = REFERENCE_FULL_MOON_MS - (LUNAR_CYCLE_DAYS / 2) * 24 * 60 * 60 * 1000;
  const daysSinceNew = (from.getTime() - newMoonBeforeRef) / (24 * 60 * 60 * 1000);
  const daysIntoCycle = ((daysSinceNew % LUNAR_CYCLE_DAYS) + LUNAR_CYCLE_DAYS) % LUNAR_CYCLE_DAYS;
  return daysIntoCycle;
}

/**
 * Fracción iluminada de la luna (0 = luna nueva, 1 = luna llena).
 * Ángulo de fase: 0° en luna nueva (cara oscura), 180° en luna llena (cara iluminada).
 */
function getMoonPhaseIllumination(from: Date): number {
  const daysIntoCycle = getDaysSinceNewMoon(from);
  const phase = daysIntoCycle / LUNAR_CYCLE_DAYS;
  const phaseAngle = Math.PI * (1 - 2 * phase);
  return (1 + Math.cos(phaseAngle)) / 2;
}

/**
 * true = creciente (hacia luna llena), false = menguante (hacia luna nueva).
 * En hemisferio sur: creciente = iluminación a la izquierda, menguante = a la derecha.
 */
function isWaxing(from: Date): boolean {
  return getDaysSinceNewMoon(from) < LUNAR_CYCLE_DAYS / 2;
}

/**
 * Formatea una fecha a "DD/MM".
 */
function formatDateDDMM(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

/**
 * Subtítulo según día de la semana y hora (lunes a viernes por franja; fin de semana = Daytime).
 */
function getSubtitle(d: Date): string {
  const day = d.getDay();
  const h = d.getHours();

  if (day === 0 || day === 6) return "Daytime";

  if (h >= 0 && h < 6) return "Dark Hour";
  if (h >= 6 && h < 9) return "Early Morning";
  if (h >= 9 && h < 13) return "Morning";
  if (h >= 13 && h < 14) return "Lunchtime";
  if (h >= 14 && h < 18) return "Afternoon";
  if (h >= 18 && h < 20) return "After Office";
  if (h >= 20 && h < 23) return "Evening";
  return "Late Night";
}

const getBackgroundLabel = (dayLabel: string, subtitle: string): string => {
  if (subtitle === "Dark Hour") return "DARK HOUR";
  if (dayLabel === "Sat" || dayLabel === "Sun") return "WEEKEND";
  return "WEEKDAY";
}

/**
 * Hook que prepara toda la información necesaria para el componente WeekdayBanner:
 * fecha formateada, etiqueta del día, subtítulo, días hasta luna llena y opciones de estilo.
 */
export function useWeekdayBanner() {
  return useMemo(() => {
    const d = new Date();
    const subtitle = getSubtitle(d);
    const date = formatDateDDMM(d);
    const dayLabel = DAY_LABELS_EN[d.getDay()];
    const backgroundLabel = getBackgroundLabel(dayLabel, subtitle);
    const limit = getDaysUntilFullMoon(d);
    const moonPhase = getMoonPhaseIllumination(d);
    const moonWaxing = isWaxing(d);

    return {
      date,
      dayLabel,
      subtitle,
      limit,
      backgroundLabel,
      moonPhase,
      moonWaxing,
    };
  }, []);
}
