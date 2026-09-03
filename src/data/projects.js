// Static Tailwind class maps — keep these full class strings (not built via
// template interpolation) so Tailwind's JIT compiler can detect them.
export const ACCENT_CLASSES = {
  signal: {
    text: "text-signal",
    textDim: "text-signal/15",
    bg: "bg-signal",
    dot: "bg-signal",
  },
  pulse: {
    text: "text-pulse",
    textDim: "text-pulse/15",
    bg: "bg-pulse",
    dot: "bg-pulse",
  },
};

export const projects = [
  {
    id: "kasarani-lms",
    name: "Kasarani LMS",
    category: "Education Platform",
    summary:
      "A full learning-management system built for a 3,000-student institution — course delivery, grading, and attendance in one dashboard.",
    features: [
      "Role-based access for admins, tutors & students",
      "Auto-graded quiz engine with analytics",
      "Offline-first sync for low-connectivity campuses",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Redis"],
    demoUrl: "https://virtual-campus-blond.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/virtual-campus",
    thumbnail: "/ktvc-lms.png",
    accent: "signal",
  },
  {
    id: "worth-the-wait",
    name: "Worth the Wait",
    category: "Marketplace & Logistics",
    summary:
      "A Community group society for empowering women and children founded by Jamila Chari",
    features: [
      "M-Pesa & mobile-money payment integration",
      "Live produce pricing & demand forecasting",
      "Driver routing engine for last-mile delivery",
    ],
    stack: ["Next.js", "Django", "PostGIS", "Docker"],
    demoUrl: "https://worth-the-wait-eta.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/worth-thewait",
    thumbnail: "/worth-the-wait.png",
    accent: "pulse",
  },
  {
    id: "keja-mtaani",
    name: "Keja Mtaani",
    category: "Real Estate Platform",
    summary:
      "A property listing and management platform for landlords and tenants in Nairobi's informal settlements.",
    features: [
      "Works fully offline, syncs when reconnected",
      "Barcode scanning & receipt printing support",
      "One-click export to Excel & PDF",
    ],
    stack: ["Electron", "React", "SQLite", "TypeScript"],
    demoUrl: "https://keja-mtaani.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/keja-mtaani",
    thumbnail: "/keja-mtaani.png",
    accent: "signal",
  },
  {
    id: "true-love-waits",
    name: "True Love Waits",
    category: "Social Impact",
    summary:
      "A platform for connecting people in need with volunteers and resources in their community.",
    features: [
      "Custom-trained detection model, 98.2% precision",
      "Raspberry Pi + camera rig for line deployment",
      "Live defect dashboard with alerting",
    ],
    stack: ["Python", "PyTorch", "OpenCV", "Raspberry Pi"],
    demoUrl: "https://true-love-waits.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/true-love-waits",
    thumbnail: "/true-love-waits.png",
    accent: "pulse",
  },
  {
    id: "aethiria",
    name: "Aethiria",
    category: "Music & Audio Platform",
    summary:
      "A music platform focused on high-quality audio streaming and a more personal listening experience.",
    features: [
      "High-quality audio streaming",
      "Personalized music discovery",
      "Responsive listening experience across devices",
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "https://aethiria.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/aethiria",
    thumbnail: "/aethiria.png",
    accent: "pulse",
  },
  {
    id: "maison",
    name: "Maison",
    category: "Real Estate Platform",
    summary:
      "A property platform for browsing listings and helping landlords manage available spaces.",
    features: [
      "Searchable property listings",
      "Clear property details and contact paths",
      "Responsive experience for renters and landlords",
    ],
    stack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "https://maison-one-rouge.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/maison",
    thumbnail: "/maison.png",
    accent: "pulse",
  },
  {
    id: "livestock",
    name: "Agriculture",
    category: "Farm and agriculture",
    summary:
      "A farm and agriculture platform for organizing produce, operations, and market information.",
    features: [
      "M-Pesa & mobile-money payment integration",
      "Live produce pricing & demand forecasting",
      "Driver routing engine for last-mile delivery",
    ],
    stack: ["Next.js", "Django", "PostGIS", "Docker"],
    demoUrl: "https://agriculture-green-theta.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/agriculture",
    thumbnail: "/livestock.png",
    accent: "pulse",
  },
  {
    id: "hungryeagle",
    name: "Hungry Eagle",
    category: "Food Delivery Platform",
    summary:
      "A food delivery platform for connecting customers with local restaurants and managing orders.",
    features: [
      "M-Pesa & mobile-money payment integration",
      "Live produce pricing & demand forecasting",
      "Driver routing engine for last-mile delivery",
    ],
    stack: ["Next.js", "Django", "PostGIS", "Docker"],
    demoUrl: "https://hungryeagle.vercel.app/",
    caseStudyUrl: "https://github.com/Kenyanhacker/hungryeagle",
    thumbnail: "/hungryeagle.png",
    accent: "pulse",
  },
];
