export const ROUTES = {
  SPLASH: '/',
  HOME: '/home',
  ABOUT_ME: '/about-me',
  EXPERIENCES: '/experiences',
  TESTIMONIALS: '/testimonials',
  CONTACT: '/contact',
} as const;

export type ROUTES_TYPE = '/' | '/home' | '/about-me' | '/experiences' | '/testimonials' | '/contact'

/** Mapa pathname -> section id para el menú */
export const PATH_TO_SECTION: Record<string, string> = {
  [ROUTES.HOME]: ROUTES.HOME,
  [ROUTES.ABOUT_ME]: ROUTES.ABOUT_ME,
  [ROUTES.EXPERIENCES]: ROUTES.EXPERIENCES,
  [ROUTES.TESTIMONIALS]: ROUTES.TESTIMONIALS,
  [ROUTES.CONTACT]: ROUTES.CONTACT,
  [ROUTES.SPLASH]: ROUTES.SPLASH,
};

export const navItems = [
  { id: ROUTES.ABOUT_ME, label: 'About Me', path: ROUTES.ABOUT_ME, color: 'bg-gray-500' },
  { id: ROUTES.EXPERIENCES, label: 'Experiences', path: ROUTES.EXPERIENCES, color: 'bg-blue-500' },
  { id: ROUTES.TESTIMONIALS, label: 'Testimonials', path: ROUTES.TESTIMONIALS, color: 'bg-green-500' },
  { id: ROUTES.CONTACT, label: 'Contact', path: ROUTES.CONTACT, color: 'bg-purple-500' },
  { id: ROUTES.SPLASH, label: 'Exit', path: ROUTES.SPLASH, color: 'bg-gray-500' },
];

export const ANIMATION_CONFIG = {
  duration: 0.4,
  delay: 0.15,
  fast: 0.3,
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

import projectsDataJson from './projects.json'
import experiencesDataJson from './experiences.json'
import socialLinksDataJson from './social-links.json'

export const projectsData = projectsDataJson
export const experiencesData = experiencesDataJson
/** Datos para tarjetas Social Link (estilo Persona) */
export const socialLinksData = socialLinksDataJson

export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
