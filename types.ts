
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Stat {
  label: string;
  value: string;
  color: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  metric: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
}
