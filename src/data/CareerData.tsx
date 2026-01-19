// src/data/CareerData.ts
import { ReactNode } from "react";
import { Heart, TrendingUp, Users, Award } from "lucide-react";

export type Benefit = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type Opening = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance and wellness programs for you and your family.",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Career Growth",
    description:
      "Continuous learning opportunities and clear career progression paths.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Great Team",
    description: "Work with talented, passionate people in a collaborative environment.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Competitive Pay",
    description: "Industry-leading salaries, bonuses, and equity opportunities.",
  },
];

export const openings: Opening[] = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We are looking for an experienced full-stack developer to join our core engineering team.",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead product strategy and development for our cloud solutions platform.",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Create beautiful, intuitive user experiences for our digital products.",
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    description:
      "Build and maintain our cloud infrastructure and deployment pipelines.",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive our marketing strategy and brand awareness across multiple channels.",
  },
  {
    title: "Data Scientist",
    department: "Analytics",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "Analyze complex data sets and build machine learning models to drive insights.",
  },
];
