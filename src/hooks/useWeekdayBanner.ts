import { useEffect, useMemo, useState } from "react";

const ONE_HOUR_MS = 60 * 60 * 1000;

const DAY_LABELS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const LUNAR_CYCLE_DAYS = 29.530588;
const REFERENCE_FULL_MOON_MS = Date.UTC(2026, 2, 3, 11, 39);

/**
 * Days until next full moon from the given date. Uses synodic cycle and a reference full moon
 * aligned to Argentina timezone; result is timezone-agnostic.
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
 * Days elapsed since the last new moon (0 to ~29.53), used for phase and illumination.
 */
function getDaysSinceNewMoon(from: Date): number {
  const newMoonBeforeRef = REFERENCE_FULL_MOON_MS - (LUNAR_CYCLE_DAYS / 2) * 24 * 60 * 60 * 1000;
  const daysSinceNew = (from.getTime() - newMoonBeforeRef) / (24 * 60 * 60 * 1000);
  const daysIntoCycle = ((daysSinceNew % LUNAR_CYCLE_DAYS) + LUNAR_CYCLE_DAYS) % LUNAR_CYCLE_DAYS;
  return daysIntoCycle;
}

/**
 * Moon illumination fraction (0 = new, 1 = full). Phase angle 0° at new moon, 180° at full.
 */
function getMoonPhaseIllumination(from: Date): number {
  const daysIntoCycle = getDaysSinceNewMoon(from);
  const phase = daysIntoCycle / LUNAR_CYCLE_DAYS;
  const phaseAngle = Math.PI * (1 - 2 * phase);
  return (1 + Math.cos(phaseAngle)) / 2;
}

/**
 * True if waxing (toward full moon), false if waning. Southern hemisphere: waxing = lit on left.
 */
function isWaxing(from: Date): boolean {
  return getDaysSinceNewMoon(from) < LUNAR_CYCLE_DAYS / 2;
}

function formatDateDDMM(d: Date): string {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

/**
 * Subtitle by weekday and hour: weekdays use time slots (Dark Hour, Morning, etc.), weekends use "Daytime".
 */
function getSubtitle(d: Date): string {
  const day = d.getDay();
  const h = d.getHours();

  if (day === 0 || day === 6) return "Daytime";

  if (h >= 0 && h < 6) return "Dark Hour";
  if (h >= 6 && h < 9) return "Early Morning";
  if (h >= 9 && h < 12) return "Morning";
  if (h >= 13 && h < 14) return "Lunchtime";
  if (h >= 12 && h < 18) return "Afternoon";
  if (h >= 18 && h < 20) return "After Office";
  if (h >= 20 && h < 23) return "Evening";
  return "Late Night";
}

const getBackgroundLabel = (dayLabel: string, subtitle: string): string => {
  if (subtitle === "Dark Hour") return "DARK HOUR";
  if (dayLabel === "Sat" || dayLabel === "Sun") return "WEEKEND";
  return "WEEKDAY";
};

export function useWeekdayBanner() {
  const [hourTick, setHourTick] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setHourTick(Date.now()), ONE_HOUR_MS);
    return () => clearInterval(id);
  }, []);

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
  }, [hourTick]);
}
