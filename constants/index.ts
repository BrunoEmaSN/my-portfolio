export const navItems = [
  { id: 'skills', label: 'Skills', subLabel: 'About me', color: 'bg-red-500' },
  { id: 'experiences', label: 'Experiences', subLabel: 'View projects', color: 'bg-blue-500' },
  { id: 'testimonials', label: 'Testimonials', subLabel: 'Help provided', color: 'bg-green-500' },
  { id: 'contact', label: 'Contact', subLabel: 'Forge bonds', color: 'bg-purple-500' },
  { id: 'exit', label: 'Exit', subLabel: 'Goodbye friend', color: 'bg-gray-500' },
];

export const ANIMATION_CONFIG = {
  duration: 1.2,
  ease: "power2.inOut" as const,
} as const

export const POSITIONS = {
  center: { x: 0, scale: 1, opacity: 1 },
  left: { x: "-100%", scale: 0.8, opacity: 0.3 },
  right: { x: "100%", scale: 0.8, opacity: 0.3 },
} as const

export const STATES = {
  true: {
    menu: POSITIONS.center,
    layout: POSITIONS.right,
  },
  false: {
    menu: POSITIONS.left,
    layout: POSITIONS.center,
  },
} as const