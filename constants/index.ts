/** Rutas de la app (React Router) */
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

export const aboutTitle = "Hi, I'm Bruno"

export const aboutDescription = "Passionate about software development with frontend expertise. Proficient in programming, analysis, and systems design. Committed to staying updated with emerging technologies and methodologies. Eager to contribute and innovate in the technology industry."

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
    windowTitle: 'Work Experience 1',
    image: '/images/projects/project-1.png',
    imageAlt: 'Work Experience 1',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    title: 'Work Experience 1',
    description: 'Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.',
  },
  {
    windowTitle: 'Work Experience 2',
    image: '/images/projects/project-2.png',
    imageAlt: 'Work Experience 2',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    title: 'Work Experience 2',
    description: 'Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.',
  },
  {
    windowTitle: 'Work Experience 3',
    image: '/images/projects/project-3.png',
    imageAlt: 'Work Experience 3',
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    title: 'Work Experience 3',
    description: 'Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.',
  },
]

export const experiencesData = [
  {
    title: 'Frontend Developer',
    company: 'Digital Solutions Co.',
    period: '2019 - 2021',
    description:
      'Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.',
  },
  {
    title: 'Senior Frontend Engineer',
    company: 'Tech Innovations Inc.',
    period: '2021 - Present',
    description:
      'Lead frontend architecture and mentor junior developers. Implemented design systems and improved performance across multiple product lines.',
  },
  {
    title: 'Web Developer',
    company: 'Creative Agency',
    period: '2017 - 2019',
    description:
      'Built and maintained client websites with modern JavaScript frameworks. Worked closely with design teams to implement pixel-perfect interfaces.',
  },
]

/** Datos para tarjetas Social Link (estilo Persona) */
export const socialLinksData = [
  {
    id: 'fool',
    bannerText: 'SEES',
    arcanaName: 'Fool',
    rank: 5,
    description:
      'A third-year Gekkoukan High School student, Class D. A memeber of the fencing team. Also the student council president.',
    arcanaLabel: 'ARCANA',
  },
  {
    id: 'magician',
    bannerText: 'Makoto Yuki',
    arcanaName: 'Magician',
    rank: 10,
    description:
      'Makoto Yuki is a young boy who dreams of becoming a Hunter, a professional who explores the world in search of rare items and experiences.',
    arcanaLabel: 'ARCANA',
  },
  {
    id: 'priestess',
    bannerText: 'Akihiko Sanada',
    arcanaName: 'Priestess',
    rank: 7,
    description:
      'Akihiko Sanada is a young boy who dreams of becoming a Hunter, a professional who explores the world in search of rare items and experiences.',
    arcanaLabel: 'ARCANA',
  },
  {
    id: 'empress',
    bannerText: 'Shinjiro Aragaki',
    arcanaName: 'Empress',
    rank: 9,
    description:
      'Shinjiro Aragaki is a young boy who dreams of becoming a Hunter, a professional who explores the world in search of rare items and experiences.',
    arcanaLabel: 'ARCANA',
  },
  {
    id: 'emperor',
    bannerText: 'Yukari Takeba',
    arcanaName: 'Emperor',
    rank: 8,
    description:
      'Yukari Takeba is a young boy who dreams of becoming a Hunter, a professional who explores the world in search of rare items and experiences.',
    arcanaLabel: 'ARCANA',
  },
]