export enum IntakeStep {
  Q1 = 0,
  Q2 = 1,
  Q3 = 2,
  Q4 = 3,
  Q5 = 4,
  Q6 = 5,
  Q7 = 6,
  Q8 = 7,
  Q9 = 8,
  Q10 = 9,
  REPORT = 10,
  VISION = 11,
}

export interface Question {
  id: string;
  text: string;
  placeholder: string;
  description: string;
}

export interface UserResponse {
  step: IntakeStep;
  question: string;
  answer: string;
  insight: string;
}

export interface GovernanceReport {
  riskSummary: string;
  regulatoryMap: string[];
  evidencePackChecklist: string[];
  initialRiskLevel: 'High' | 'Med' | 'Low';
}
