// src/data/servicesData.ts

export type ServiceItem = {
  title: string;
  desc: string;
  videos?:string[];
};

export type ServiceGroup = {
  section: string;
  description: string;
  items: ServiceItem[];
};

export const services: ServiceGroup[] = [
  {
    section: "Education & Learning Environments",
    description:
      "We empower institutions to move beyond traditional methods with interactive, scalable technology.",
    items: [
      {
        title: "Smart Classroom Solutions",
        desc: "Interactive Flat Panels (IFP), digital podiums with integrated sound systems, and high-speed document cameras bring subjects to life.",
        videos:["https://www.youtube.com/watch?v=O1svaH1144o"],
      },
      {
        title: "Hybrid Classroom Solutions",
        desc: "Bridge the gap between physical and remote students with auto-tracking AI cameras and synchronized audio.",
        videos:["https://www.youtube.com/watch?v=rkMc8o2KxKw"],
      },
      {
        title: "LMS (Learning Management System)",
        desc: "Centralized hub for curriculum, assessments, progress tracking, and analytics.",
        videos:["https://www.youtube.com/watch?v=402Th-dUjHs"],
      },
    ],
  },
  {
    section: "Professional Content & Media Setups",
    description:
      "Whether you are an educator or corporate leader, your voice deserves professional-grade clarity.",
    items: [
      {
        title: "Studio Setup Solutions",
        desc: "Professional recording environments for YouTube, online courses, and internal training.",
      },
      {
        title: "Podcast Setup",
        desc: "High-quality microphones, sound mixers, and acoustic treatments for crystal-clear audio.",
      },
      {
        title: "Lighting Solutions",
        desc: "LED lighting, key lights, and RGB backgrounds for a polished on-camera presence.",
      },
    ],
  },
  {
    section: "Corporate & Business Excellence",
    description:
      "Modernize your workspace with automation, collaboration tools, and strategic outsourcing.",
    items: [
      {
        title: "Conference Room Solutions",
        desc: "PTZ cameras, wireless screen sharing, and smart automation for seamless meetings.",
      },
      {
        title: "BPO (Business Process Outsourcing)",
        desc: "Dedicated support and back-office services to optimize workflows and scale efficiently.",
      },
      {
        title: "IT & Services",
        desc: "We provide Web Development, CRM Development, and App Development services. From web and mobile applications to complete IT infrastructure solutions, we handle your technology needs end-to-end.",
      },
    ],
  },
];
