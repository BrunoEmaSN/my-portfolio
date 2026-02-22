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

export const skillsItems = [
  {
    id: 'languages', name: 'Languages', values: [
      { id: 'typescript', name: 'Typescript', stats: 255, logo: '/images/skills/typescript.png' },
      { id: 'python', name: 'Python', stats: 200, logo: '/images/skills/python.png' },
    ]
  },
  {
    id: 'frontend', name: 'Frontend', values: [
      { id: 'react', name: 'React', stats: 200, logo: '/images/skills/react.png' },
      { id: 'tailwindcss', name: 'Tailwindcss', stats: 150, logo: '/images/skills/tailwind.png' },
      { id: 'threejs', name: 'Threejs', stats: 50, logo: '/images/skills/threejs.png' },
      { id: 'gsap', name: 'Gsap', stats: 50, logo: '/images/skills/gsap.png' },
    ]
  },
  {
    id: 'backend', name: 'Backend', values: [
      { id: 'nestjs', name: 'Nestjs', stats: 100, logo: '/images/skills/nestjs.png' },
      { id: 'mysql', name: 'Mysql', stats: 100, logo: '/images/skills/mysql.png' },
      { id: 'postgres', name: 'Postgres', stats: 50, logo: '/images/skills/postgres.png' },
    ]
  },
  {
    id: 'tools', name: 'Tools', values: [
      { id: 'git', name: 'Git', stats: 255, logo: '/images/skills/git.png' },
      { id: 'docker', name: 'Docker', stats: 50, logo: '/images/skills/docker.png' },
      { id: 'cursor', name: 'Cursor', stats: 50, logo: '/images/skills/cursor.png' },
    ]
  },
]

export const infoStats = [
  { label: 'Year Experiencies', value: '15+' },
  { label: 'Satisfied Clients', value: '200+' },
  { label: 'Completed Projects', value: '108+' },
  { label: 'Client Retention Rate', value: '90%' },
]

export const infoFeatures = [
  'Full Stack development with a focus on frontend technologies.',
  'Passionate about software development with frontend expertise.',
  'Proficient in programming, analysis, and systems design.',
  'Eager to contribute and innovate in the technology industry.',
]

export const projectsData = [
  {
    windowTitle: 'Roulette',
    image: '/images/projects/roulette.png',
    imageAlt: 'Roulette',
    tags: ['Next.js','React 19','TypeScript','PostgreSQL', 'Drizzle ORM','Better Auth','Tailwind CSS','Railway'],
    title: 'Roulette - App',
    url: 'https://roulette.up.railway.app/',
    description: 'Web application to create and manage custom roulette wheels with editable options, customizable colors and an improved randomness system that uses weather data from Buenos Aires.',
  },
  {
    windowTitle: 'Cocktail',
    image: '/images/projects/cocktail.png',
    imageAlt: 'Cocktail',
    tags: ['React', 'Vite', 'GSAP', 'Tailwind CSS', 'Vercel'],
    title: 'Cocktail - Landing Page',
    url: 'https://gsap-coktails.vercel.app/',
    description: 'Cocktail landing page built. Includes GSAP animations and responsive design.',
  },
  {
    windowTitle: 'MacBook Pro',
    image: '/images/projects/macbook.png',
    imageAlt: 'MacBook Pro',
    tags: ['React 19','Vite','React Three Fiber','GSAP','Tailwind CSS','Zustand','react-responsive','clsx', 'Vercel'],
    title: 'MacBook Pro - Landing Page',
    url: 'https://macbook-gsap-r3f-app.vercel.app/',
    description: 'Una landing page interactiva y moderna para el MacBook Pro, construida con React Three Fiber (R3F) y GSAP. Esta aplicación web ofrece una experiencia inmersiva con modelos 3D interactivos, animaciones fluidas basadas en scroll y visualización de productos en tiempo real',
  },
]

export const experiencesData = [
  {
    title: 'AI Engineer',
    company: 'Centro de E-learning',
    period: '2024 - Present',
    description:
      'I am responsible for the development of Talentia platform used AI to generate content and improve the learning experience.',
  },
  {
    title: 'Mobile Developer',
    company: 'Quorum IT.',
    period: '2022 - 2024',
    description:
      'I was responsible for the development of the mobile app for the Quorum IT company.',
  },
  {
    title: 'Full Stack Developer',
    company: 'DirMOD',
    period: '2021 - 2022',
    description:
      'I was responsible for the development of the web app for the DirMOD company and provided continuous improvement support to clients with developed systems.',
  },
]

/** Datos para tarjetas Social Link (estilo Persona) */
export const socialLinksData = [
  {
    id: 'fool',
    bannerText: 'Mirian Gonzalez',
    arcanaName: 'PM',
    rank: 10,
    description:
      'With more than 13 years of experience specializing in the management of software and mobile application projects.',
    comment: 'I had the pleasure of working with Bruno in his early career as a Developer. His ability to learn quickly and apply his knowledge was excellent. He demonstrated skill in creating user interfaces and collaborated effectively with the team to integrate front-end solutions. He is a great colleague who conducts himself responsibly and in accordance with business standards. He also has a lot of potential and would be a valuable addition to any team.',
    arcanaLabel: 'Quorum IT',
    image: null,
  },
]
