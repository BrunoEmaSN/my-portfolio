export const SECTIONS = {
  SKILLS: 'skills',
  EXPERIENCES: 'experiences',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
  EXIT: 'exit',
} as const;

export const navItems = [
  { id: SECTIONS.SKILLS, label: 'Skills', color: 'bg-red-500' },
  { id: SECTIONS.EXPERIENCES, label: 'Experiences', color: 'bg-blue-500' },
  { id: SECTIONS.TESTIMONIALS, label: 'Testimonials', color: 'bg-green-500' },
  { id: SECTIONS.CONTACT, label: 'Contact', color: 'bg-purple-500' },
  { id: SECTIONS.EXIT, label: 'Exit', color: 'bg-gray-500' },
];

export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: "power2.inOut" as const,
} as const

export const POSITIONS = {
  center: { x: 0, scale: 1, opacity: 1 },
  left: { x: 0, scale: 1.3, opacity: 0 },
  right: { x: 0, scale: 1.3, opacity: 0 },
} as const

export const STATES = {
  true: {
    menu: POSITIONS.center,
    layout: POSITIONS.right,
  },
  false: {
    menu: POSITIONS.center,
    layout: POSITIONS.center,
  },
} as const