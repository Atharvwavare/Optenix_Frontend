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
    description:
      "Work with talented, passionate people in a collaborative environment.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Competitive Pay",
    description:
      "Industry-leading salaries, bonuses, and equity opportunities.",
  },
];

export const openings: Opening[] = [
  {
    title: " Full Stack Developer",
    department: "Engineering",
    location: "Pune,India",
    type: "Full-time",
    description:
      "We are looking for an  full-stack developer to join our core engineering and business team.",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Pune,India",
    type: "Full-time",
    description:
      "Lead product strategy and development for our cloud solutions platform.",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Pune,India",
    type: "Full-time",
    description:
      "Create beautiful, intuitive user experiences for our digital products.",
  },
  {
    title: "Lead Generation Executive",
    department: "Marketing",
    location: "Pune,India",
    type: "Full-time",
    description:
      "Drive business growth by identifying, nurturing, and converting high-quality leads into long-term client relationships.",
  },
  {
    title: "Insight Sales Executive",
    department: "Marketing",
    location: "Pune,India",
    type: "Full-time",
    description:
      "Drive revenue growth by engaging prospects, qualifying leads, and converting opportunities into successful sales.",
  },
  {
    title: "Field Sales Executive",
    department: "Marketing and business",
    location: "Pune,India",
    type: "Full-time",
    description:
      "Identify new business opportunities, meet clients on-site, and close deals to drive revenue growth in assigned territories.",
  },
];
