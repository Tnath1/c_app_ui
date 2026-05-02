export type ApplicationStatus = "received" | "reviewing" | "matched";

export type ApplicationFormInput = {
  coverLetter: string;
  email: string;
  experienceYears: number | string;
  fullName: string;
  linkedInUrl: string;
  location: string;
  phone: string;
  portfolioUrl: string;
  resumeUrl: string;
  roleId: string;
};

export type CandidateApplicationPayload = {
  coverLetter: string;
  email: string;
  experienceYears: number;
  fullName: string;
  linkedInUrl: string;
  location: string;
  phone: string;
  portfolioUrl: string;
  resumeUrl: string;
  roleId: string;
};

export type ApplicationSubmissionResponse = {
  applicationId: string;
  candidateName: string;
  message: string;
  receivedAt: string;
  status: ApplicationStatus;
};
