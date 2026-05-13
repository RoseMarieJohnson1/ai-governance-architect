import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'Q1',
    text: 'System Name & Description',
    placeholder: 'e.g., Project Sphinx - Customer Sentiment Analysis Engine',
    description: 'Provide a plain-language function and name for your AI system.',
  },
  {
    id: 'Q2',
    text: 'Intended Use Case',
    placeholder: 'e.g., Automating routing of customer tickets based on priority...',
    description: 'What is the business context and objective of this project?',
  },
  {
    id: 'Q3',
    text: 'Users & Affected Populations',
    placeholder: 'e.g., Marketing team (Operators) vs. Global Retail Customers (Subjects)',
    description: 'Define who will operate the system and whose data/lives will be affected.',
  },
  {
    id: 'Q4',
    text: 'Deployment Geography',
    placeholder: 'e.g., EU (Germany), USA (California), Singapore',
    description: 'Which jurisdictions will this system operate in or affect?',
  },
  {
    id: 'Q5',
    text: 'Autonomy Level',
    placeholder: 'e.g., Partial - AI suggests, human approves final routing...',
    description: 'What is the degree of human oversight or "Human-in-the-Loop"?',
  },
  {
    id: 'Q6',
    text: 'Data Used & Sources',
    placeholder: 'e.g., Customer support logs, PII (email), synthesized proxies...',
    description: 'What types of data are being used? Flag sensitivity (PII, Biometric, etc.).',
  },
  {
    id: 'Q7',
    text: 'Model Type & Source',
    placeholder: 'e.g., Fine-tuned GPT-4o via Azure, custom Llama-3 local...',
    description: 'Define the architecture and provider of the model.',
  },
  {
    id: 'Q8',
    text: 'Applicable Regulations',
    placeholder: 'e.g., EU AI Act, GDPR, CCPA, ISO 42001...',
    description: 'List laws and standards you believe are currently triggered.',
  },
  {
    id: 'Q9',
    text: 'Risk Level Assignment',
    placeholder: 'e.g., High - Handles sensitive customer health data...',
    description: 'Your initial self-classification (High/Med/Low).',
  },
  {
    id: 'Q10',
    text: 'Governance Owner',
    placeholder: 'e.g., Chief Data Officer / Sarah Chen',
    description: 'Who is the Directly Responsible Individual (DRI) for this system?',
  },
];
