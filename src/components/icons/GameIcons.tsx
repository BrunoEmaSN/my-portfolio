/**
 * Game Icons (react-icons/gi) re-exportados con nombres semánticos
 * para uso en slots de inventario/habilidad (estilo azul/angular).
 */
import {
  GiHearts,
  GiHeartBattery,
  GiHealthPotion,
  GiKey,
  GiFeather,
  GiBasket,
  GiCompactDisc,
  GiPotionBall,
  GiCubes,
  GiGears,
  GiPresent,
  GiSwordClash,
  GiSwordsEmblem,
  GiDaggers,
  GiClaws,
  GiFist,
  GiAxeSwing,
  GiBoots,
  GiLightningArc,
  GiImpactPoint,
  GiArrowFlights,
  GiRecycle,
  GiTargeted,
  GiSpikyEclipse,
  GiHealthNormal,
  GiArtificialHive,
  GiCloverSpiked,
  GiCycle,
  GiPunch,
} from "react-icons/gi";

// Estado / recursos (HP, SP, corazón)
export const GameIconHearts = GiHearts;
export const GameIconHeartBattery = GiHeartBattery;
export const GameIconHealthPotion = GiHealthPotion;

// Objetos
export const GameIconKey = GiKey;
export const GameIconFeather = GiFeather;
export const GameIconBasket = GiBasket;
export const GameIconCompactDisc = GiCompactDisc;
export const GameIconPotionBall = GiPotionBall;
export const GameIconCubes = GiCubes;
export const GameIconGears = GiGears;
export const GameIconPresent = GiPresent;

// Combate / armas
export const GameIconSword = GiSwordClash;
export const GameIconSwordsEmblem = GiSwordsEmblem;
export const GameIconDaggers = GiDaggers;
export const GameIconClaws = GiClaws;
export const GameIconFist = GiFist;
export const GameIconAxe = GiAxeSwing;
export const GameIconBoots = GiBoots;

// Efectos / abstractos
export const GameIconLightning = GiLightningArc;
export const GameIconImpact = GiImpactPoint;
export const GameIconArrowFlights = GiArrowFlights;
export const GameIconRecycle = GiRecycle;
export const GameIconTarget = GiTargeted;
export const GameIconSpikyEclipse = GiSpikyEclipse;
export const GameIconHealthNormal = GiHealthNormal;
export const GameIconArtificialHive = GiArtificialHive;
export const GameIconCloverSpiked = GiCloverSpiked;
export const GameIconCycle = GiCycle;
export const GameIconPunch = GiPunch;

/** Iconos agrupados por categoría para listas o selectores */
export const gameIconsByCategory = {
  status: [GiHearts, GiHeartBattery, GiHealthPotion],
  items: [GiKey, GiFeather, GiBasket, GiCompactDisc, GiPotionBall, GiCubes, GiGears, GiPresent],
  combat: [GiSwordClash, GiSwordsEmblem, GiDaggers, GiClaws, GiFist, GiAxeSwing, GiBoots],
  effects: [GiLightningArc, GiImpactPoint, GiArrowFlights, GiRecycle, GiTargeted, GiSpikyEclipse],
} as const;
