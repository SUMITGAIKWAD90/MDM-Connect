import { HelpCircle, Landmark, ListChecks, Phone, ShieldCheck, Sprout, Target } from 'lucide-react';

export const infoCards = [
  {
    title: 'Objectives & Benefits',
    description: 'Enhancing nutritional levels among children while improving attendance and classroom participation across India.',
    icon: Target,
    tone: 'primary',
  },
  {
    title: 'Eligibility Criteria',
    description: 'All children in Government and Government-aided schools from classes I to VIII are covered under PM POSHAN.',
    icon: ListChecks,
    tone: 'secondary',
  },
  {
    title: 'Nutritional Standards',
    description: 'Meals include calories, protein, grains and fresh ingredients aligned with FSSAI guidance and state menus.',
    icon: Sprout,
    tone: 'accent',
  },
  {
    title: 'Implementation Guidelines',
    description: 'State-wise operational standards for fund release, cooking cost support, food grain allocation and monitoring.',
    icon: Landmark,
    tone: 'primary',
  },
  {
    title: 'Contact Information',
    description: 'Reach district-level PM POSHAN officers and Ministry helpdesk channels for grievances or account support.',
    icon: Phone,
    tone: 'secondary',
  },
  {
    title: 'FAQ',
    description: 'Answers to common queries around disbursement cycles, reporting requirements and school onboarding.',
    icon: HelpCircle,
    tone: 'accent',
  },
];

export const newsItems = [
  {
    date: '12 Mar 2026',
    category: 'Policy',
    title: 'PM POSHAN coverage expanded for aspirational districts',
    summary: 'The Ministry announced enhanced nutrition support in low-attendance blocks with strengthened digital monitoring.',
  },
  {
    date: '28 Feb 2026',
    category: 'Funding',
    title: 'Revised cost norms approved for FY 2026-27',
    summary: 'Updated benchmarks improve flexibility for local menu planning and inflation-adjusted procurement.',
  },
  {
    date: '03 Feb 2026',
    category: 'Technology',
    title: 'Blockchain audit trail rollout across pilot states',
    summary: 'Transaction transparency now includes district-level status streams with searchable receipt IDs.',
  },
];

export const resolutions = [
  { date: '10 Mar 2026', code: 'GR/PMPOSHAN/2026/011', title: 'Kitchen Infrastructure Compliance Framework' },
  { date: '24 Feb 2026', code: 'GR/PMPOSHAN/2026/009', title: 'Revised Per-Child Cost Norms for FY 2026-27' },
  { date: '17 Jan 2026', code: 'GR/PMPOSHAN/2026/004', title: 'Digital Monitoring & Reporting Standards' },
  { date: '05 Jan 2026', code: 'GR/PMPOSHAN/2026/001', title: 'District Officer Appointment Guidelines' },
  { date: '19 Dec 2025', code: 'GR/PMPOSHAN/2025/119', title: 'State Audit Checklist and SLA Timelines' },
];

export const disbursementSteps = [
  'Weekly Release: Funds released weekly from state treasury',
  'Per-Student Allocation: ?5.45 (Primary) / ?8.21 (Upper Primary) per child',
  'Blockchain Record: Every transaction recorded on Polygon network',
  'School Receipt: Schools confirm receipt via digital acknowledgement',
];

export const securityItems = [
  {
    title: 'Polygon Network',
    detail: 'All transactions on immutable blockchain.',
    icon: ShieldCheck,
  },
  {
    title: 'End-to-End Encrypted',
    detail: 'Bank-grade security for all payment data.',
    icon: ShieldCheck,
  },
  {
    title: 'Audit Trail Maintained',
    detail: 'Complete transaction history is preserved.',
    icon: ShieldCheck,
  },
];
