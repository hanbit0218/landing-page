// ── World Config ──────────────────────────────────────────────────────────────
export const WORLD_W = 2200;
export const WORLD_H = 1600;
export const SPAWN    = { x: 1078, y: 808 };
export const PLAYER_W = 22;
export const PLAYER_H = 34;
export const PLAYER_SPEED   = 5.2;
export const INTERACT_EXPAND = 68;

// ── Road network (visual only, no collision) ──────────────────────────────────
export const roads = [
  // Main east-west spine
  { x: 0,    y: 758, w: 2200, h: 62,  dir: 'h' },
  // North arm → education
  { x: 1048, y: 98,  w: 104,  h: 660, dir: 'v' },
  // South arm → skills
  { x: 1048, y: 820, w: 104,  h: 488, dir: 'v' },
  // Left branch → work experience
  { x: 308,  y: 706, w: 104,  h: 316, dir: 'v' },
  // Right branch → projects
  { x: 1876, y: 524, w: 104,  h: 494, dir: 'v' },
];

// ── Direction Signs ────────────────────────────────────────────────────────────
export const signs = [
  // Center intersection — above main road, beside north/south arm
  { x: 896,  y: 698, lines: ['↑  EDUCATION'] },
  { x: 896,  y: 826, lines: ['↓  SKILLS'] },
  // Center intersection — flanking E/W
  { x: 808,  y: 726, lines: ['←  WORK EXP'] },
  { x: 1166, y: 726, lines: ['PROJECTS  →'] },
  // Left branch — between life stages and headstarter
  { x: 418,  y: 713, lines: ['↑  LIFE STAGES', '↓  HEADSTARTER'] },
  // Right branch — west of project column
  { x: 1770, y: 532, lines: ['→  ZAIKU', '→  PROMPTWAVE', '→  HYDROSENSE'] },
];

// ── Game Objects ──────────────────────────────────────────────────────────────
export const gameObjects = [
  {
    id: 'about',
    label: 'David Song',
    sublabel: 'Software Engineer',
    icon: '◈',
    x: 936,  y: 638, w: 224, h: 120,
    solid: false,           // player can walk through; only blocks via proximity
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.45)',
  },
  {
    id: 'education',
    label: 'SJSU',
    sublabel: 'B.S. Computer Science',
    icon: '◉',
    x: 956,  y: 98,  w: 248, h: 172,
    solid: true,
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.45)',
  },
  {
    id: 'lifestages',
    label: 'Life Stages',
    sublabel: 'SWE Intern',
    icon: '⬡',
    x: 96,   y: 706, w: 212, h: 148,
    solid: true,
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.45)',
  },
  {
    id: 'headstarter',
    label: 'Headstarter AI',
    sublabel: 'SWE Fellow',
    icon: '⬡',
    x: 96,   y: 860, w: 212, h: 148,
    solid: true,
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.45)',
  },
  {
    id: 'zaiku',
    label: 'Zaiku',
    sublabel: 'Search Platform',
    icon: '▣',
    x: 1876, y: 524, w: 210, h: 148,
    solid: true,
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.45)',
  },
  {
    id: 'promptwave',
    label: 'PromptWave',
    sublabel: 'LLM Interface',
    icon: '▣',
    x: 1876, y: 706, w: 210, h: 148,
    solid: true,
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.45)',
  },
  {
    id: 'hydrosense',
    label: 'HydroSense',
    sublabel: 'IoT Dashboard',
    icon: '▣',
    x: 1876, y: 860, w: 210, h: 148,
    solid: true,
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.45)',
  },
  {
    id: 'skills',
    label: 'Skills Lab',
    sublabel: 'Tech Stack',
    icon: '◈',
    x: 888,  y: 1308, w: 290, h: 162,
    solid: true,
    color: '#ec4899',
    glowColor: 'rgba(236,72,153,0.45)',
  },
];

// ── Resume Data ───────────────────────────────────────────────────────────────
export const resumeData = {
  about: {
    type: 'about',
    name: 'David Song',
    role: 'Software Engineer',
    email: 'davidhsongg@gmail.com',
    phone: '(669) 236-1331',
    linkedin: 'https://www.linkedin.com/in/davidthesong/',
    github: 'https://github.com/davidhsong',
    description:
      'CS graduate from SJSU building full-stack applications, AI-powered tools, and scalable cloud systems. Passionate about clean code, great UX, and shipping products that work.',
  },
  education: {
    type: 'education',
    school: 'San José State University',
    location: 'San José, CA',
    degree: 'B.S., Computer Science',
    minor: 'Minor in Digital Media Art',
    graduation: 'Dec 2025',
    gpa: '3.5',
    courses: [
      'Data Structures & Algorithms', 'Object-Oriented Design',
      'Operating Systems', 'Machine Learning', 'Database Systems',
      'Information Security', 'Software Engineering', 'Big Data Tools',
    ],
  },
  lifestages: {
    type: 'work',
    company: 'Life Stages',
    role: 'Software Engineer Intern',
    location: 'San Francisco, CA',
    period: 'May 2024 — Jul 2024',
    bullets: [
      'Deployed React.js components for a high-traffic web application using Hooks and state management for seamless user interaction.',
      'Refactored the "Daily Check-in" workflow, reducing user friction by 25% and implementing client-side validation to minimize malformed API requests.',
      'Partnered with QA teams via Git/GitHub pull requests to resolve critical UI bottlenecks, improving stability across mobile and desktop.',
    ],
  },
  headstarter: {
    type: 'work',
    company: 'Headstarter AI',
    role: 'Software Engineer Fellow',
    location: 'Remote',
    period: 'Jul 2024 — Aug 2024',
    bullets: [
      'Shipped 5 full-stack AI applications in an Agile/Scrum environment, delivering MVPs through weekly 7-day sprints and public technical demos.',
      'Built a RAG-based interview prep tool using OpenAI API and Vector Databases, focusing on prompt engineering and latency reduction.',
      'Configured end-to-end CI/CD pipelines using Python, REST APIs, and Cloud services for a scalable final project architecture.',
    ],
  },
  zaiku: {
    type: 'project',
    name: 'Zaiku',
    subtitle: 'Full-Stack Content Search Platform',
    period: 'Jan 2025 — Apr 2025',
    tech: ['ElasticSearch', 'Node.js', 'Express.js', 'JWT', 'Google OAuth 2.0'],
    bullets: [
      'Constructed a scalable search engine using ElasticSearch with custom indexing and fuzzy search for complex queries across distributed datasets.',
      'Hardened authentication using JWT and Google OAuth 2.0, securing user sessions and protecting sensitive API endpoints.',
      'Built a modular Node.js/Express.js backend with 90%+ test coverage using unit and integration tests.',
    ],
  },
  promptwave: {
    type: 'project',
    name: 'PromptWave',
    subtitle: 'LLM-Agnostic Chatbot Interface',
    period: 'Aug 2024 — Oct 2024',
    tech: ['React.js', 'Express.js', 'Redis', 'Hugging Face', 'REST APIs'],
    bullets: [
      'Built a React.js frontend that switches between multiple Hugging Face models in real-time via a custom API adapter layer.',
      'Implemented Redis Caching to reduce repeat query response times by approximately 60%.',
      'Handled async middleware in Express.js for concurrent API streams, ensuring responsive UI during heavy model inference.',
    ],
  },
  hydrosense: {
    type: 'project',
    name: 'HydroSense',
    subtitle: 'Real-Time IoT Data Dashboard',
    period: 'Oct 2023 — Nov 2023',
    tech: ['Node.js', 'WebSockets', 'Google Sheets API', 'CSS'],
    bullets: [
      'Developed a data visualization dashboard using Node.js and WebSockets to stream real-time water sensor metrics.',
      'Integrated Google Sheets API to automate data persistence and external reporting for non-technical stakeholders.',
      'Refactored CSS architecture with Responsive Design principles for 100% cross-platform compatibility.',
    ],
  },
  skills: {
    type: 'skills',
    categories: [
      { name: 'Languages',        items: ['JavaScript (ES6+)', 'Python', 'Java', 'SQL', 'HTML/CSS', 'C/C++'] },
      { name: 'Frameworks',       items: ['React.js', 'Node.js', 'Express.js', 'Redux', 'Flask', 'Scikit-learn', 'PyTorch'] },
      { name: 'Databases & Cloud', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'ElasticSearch', 'Firebase', 'GCP', 'AWS'] },
      { name: 'Tools & DevOps',   items: ['Git', 'GitHub', 'Docker', 'CI/CD', 'REST APIs', 'JWT/OAuth', 'Figma', 'Linux'] },
    ],
  },
};
