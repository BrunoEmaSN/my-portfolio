export const SECTIONS = {
  ABOUT_ME: 'about-me',
  EXPERIENCES: 'experiences',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
  EXIT: 'exit',
} as const;

export const navItems = [
  { id: SECTIONS.ABOUT_ME, label: 'About Me', color: 'bg-gray-500' },
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

export const skillsItems = [
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'express', name: 'Express' },
  { id: 'mongodb', name: 'MongoDB' },
  { id: 'mysql', name: 'MySQL' },
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'docker', name: 'Docker' },
  { id: 'kubernetes', name: 'Kubernetes' },
]

export const aboutTitle = "Hi, I'm Bruno"

export const aboutDescription = "Passionate about software development with frontend expertise. Proficient in programming, analysis, and systems design. Committed to staying updated with emerging technologies and methodologies. Eager to contribute and innovate in the technology industry."