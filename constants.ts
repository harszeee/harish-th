
import { Experience, SkillCategory, Stat, Project, ContactInfo } from './types';

export const PERSONAL_INFO = {
  name: "Harish T H",
  title: "Campaign Manager",
  company: "Amazon",
  coreStrength: "Strategic Ad Growth",
  summary: "7+ years mastering the Amazon media ecosystem. From leading massive operations teams to driving 40% ROI for global brands, I specialize in the intersection of data-driven strategy and creative excellence.",
};

export const CONTACT: ContactInfo = {
  email: "harish.san080@gmail.com",
  phone: "+91 99167 57100",
  address: "Bangalore, India",
  linkedin: "https://www.linkedin.com/in/harishth3105/"
};

export const HARISHBACK_STATS: Stat[] = [
  { label: "Campaign ROI Increase", value: "40%", color: "bg-indigo-500" },
  { label: "Repeat Business Rate", value: "55%", color: "bg-emerald-500" },
  { label: "SLA Adherence", value: "95%+", color: "bg-amber-500" },
  { label: "Operations Team Size", value: "22+", color: "bg-rose-500" },
  { label: "Staffing Leakage Reduced", value: "12%", color: "bg-sky-500" },
  { label: "Ad Approval Growth", value: "+12%", color: "bg-violet-500" }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Strategic Growth",
    items: [
      { name: "Campaign Management", color: "#6366f1" },
      { name: "Digital Marketing", color: "#4f46e5" },
      { name: "SEO Optimization", color: "#4338ca" },
      { name: "Revenue Enablement", color: "#3730a3" }
    ]
  },
  {
    category: "Operations Mastery",
    items: [
      { name: "Lean Six Sigma", color: "#10b981" },
      { name: "Workforce Analytics", color: "#059669" },
      { name: "SLA Management", color: "#047857" },
      { name: "DMAIC Framework", color: "#065f46" }
    ]
  },
  {
    category: "Tech Stack",
    items: [
      { name: "Amazon DSP", color: "#ff9900" },
      { name: "Salesforce", color: "#00a1e0" },
      { name: "JIRA", color: "#0052cc" },
      { name: "Confluence", color: "#172b4d" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Campaign Manager",
    company: "Amazon Development Centre",
    location: "Bengaluru, India",
    period: "May 2024 - Present",
    highlights: [
      "Manage high-impact advertiser engagements for L'Oreal, Samsung, and Lenovo.",
      "Spearheaded technical production of online creatives across global markets.",
      "Optimized ad strategies resulting in a 40% ROI increase for premium launches.",
      "Developed cross-vertical data insights for process architecture improvements."
    ]
  },
  {
    id: "exp2",
    role: "Ad Policing Manager",
    company: "Amazon Development Centre",
    location: "Bengaluru, India",
    period: "Apr 2021 - May 2024",
    highlights: [
      "Directed 22+ operations representatives ensuring 95% SLA consistency.",
      "Reduced policy friction to improve ad approval rates by 12% yearly.",
      "Drove a 55% increase in repeat business through consultative brand relationships.",
      "Applied DMAIC techniques to plug 12% staffing leakage gaps."
    ]
  },
  {
    id: "exp3",
    role: "Operations Team Lead",
    company: "Amazon Development Centre",
    location: "Bengaluru, India",
    period: "Apr 2017 - Apr 2021",
    highlights: [
      "Initial point of escalation for 25+ associates in high-volume environment.",
      "Managed workforce productivity through performance analytics dashboards.",
      "Developed training content for global onboarding programs."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Global Brand Expansion",
    category: "Strategy",
    description: "Launch of specialized ad creatives for luxury conditioners in emerging markets.",
    metric: "40% ROI Increase"
  },
  {
    title: "Operational Leakage Fix",
    category: "Lean Management",
    description: "Deployment of Lean Six Sigma methodologies to optimize workforce allocation.",
    metric: "12% Efficiency Gain"
  },
  {
    title: "Ad Policing Reform",
    category: "Policy",
    description: "Modernizing locale-based ad restrictions for high-growth tech brands.",
    metric: "+12% Approval Rate"
  }
];
