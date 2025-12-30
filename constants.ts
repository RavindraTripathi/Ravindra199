
import { Experience, SkillGroup, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Ravindra Kumar Tripathi",
  title: "SAP Software Developer",
  subTitle: "Ex-Merkle | ABAP | SAP S/4HANA | SQL | Creator @CodeAbap",
  location: "Lucknow, Uttar Pradesh, India",
  email: "tripathiravindra212@gmail.com",
  linkedin: "https://www.linkedin.com/in/ravindra5",
  portfolio: "ravindra-kumar-tripathi-gjm3ctw.gamma.site/",
  summary: "I’m an SAP ABAP Developer with 1.5 years of hands-on experience in S/4HANA development, RICEF objects, and ABAP on HANA performance optimization. Skilled in CDS Views, OData Services, ALV Reports, and modular programming, I focus on writing clean, efficient, and scalable code aligned with SAP’s modern development standards."
};

export const EXPERIENCES: Experience[] = [
  {
    company: "HCLTech",
    role: "Software Developer",
    period: "December 2024 - Present",
    location: "Lucknow, India",
    description: [
      "Developed custom ABAP programs in S/4HANA (FI, SD, MM modules).",
      "Built CDS Views and OData Services for real-time analytics and Fiori integration.",
      "Enhanced system performance through Open SQL and modular programming.",
      "Supported end-to-end development and debugging in ABAP on HANA."
    ]
  },
  {
    company: "Freelance (Self employed)",
    role: "Freelance Abap Developer",
    period: "March 2024 - December 2024",
    location: "Hyderabad, India",
    description: [
      "Designed custom tables, transaction codes, and background jobs.",
      "Automated repetitive business workflows through ABAP enhancements.",
      "Delivered small-scale custom solutions improving process efficiency."
    ]
  },
  {
    company: "Merkle",
    role: "Associate Analyst",
    period: "September 2023 - December 2023",
    location: "Mumbai, India",
    description: [
      "Assisted in data operations and reporting using SQL and Excel.",
      "Collaborated on e-commerce system enhancements and validations.",
      "Gained early exposure to business processes and system integration."
    ]
  },
  {
    company: "Merkle",
    role: "Consultant, Digital Commerce",
    period: "January 2022 - September 2023",
    location: "Mumbai, India",
    description: [
      "Managed client issues and SLA-driven incident resolution.",
      "Conducted staging, QA checks, and inventory reconciliation.",
      "Assisted in tool enhancements and regular operational validations."
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "RICEF & Enhancement",
    skills: ["RICEF", "Enhancements", "ALV Reports", "Smartforms", "Debugging"]
  },
  {
    category: "SAP S/4HANA & Database",
    skills: ["S/4HANA", "ABAP on HANA", "CDS Views", "OData", "AMDP", "Open SQL"]
  },
  {
    category: "Quality & Performance",
    skills: ["Performance Tuning", "Modularization", "Clean ABAP", "SAP Fiori Integration", "SQL"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "SQL" },
  { name: "AI Software engineer:-level 3" },
  { name: "SAP ABAP on sap cloud" },
  { name: "SAP ECC to S/4HANA Transformation - Bluefield" },
  { name: "SQL Basic" }
];
