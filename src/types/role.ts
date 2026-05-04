export type EmploymentType = "Full-time" | "Contract" | "Part-time";
export type WorkplaceType = "Remote" | "Hybrid" | "On-site";

export type Role = {
  description: string;
  department: string;
  employmentType: EmploymentType;
  id: string;
  location: string;
  salaryRange: string;
  title: string;
  workplace: WorkplaceType;
};

export type RolesResponse = {
  roles: Role[];
};
