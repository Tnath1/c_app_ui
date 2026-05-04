export type ApplicationStatus = "received" | "reviewing" | "matched";

export type ResumeAttachment = {
  base64: string;
  fileName: string;
  fileSize: number;
  fileType: "application/pdf";
};

export type ApplicationFormInput = {
  coverLetter: string;
  email: string;
  experienceYears: number | string;
  fullName: string;
  linkedInUrl: string;
  location: string;
  phone: string;
  portfolioUrl: string;
  resume?: ResumeAttachment;
  roleId: string;
  skills: string[];
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
  resume: ResumeAttachment;
  roleId: string;
  skills: string[];
};

export type ApplicationSubmissionResponse = {
  applicationId: string;
  candidateName: string;
  message: string;
  receivedAt: string;
  status: ApplicationStatus;
};
