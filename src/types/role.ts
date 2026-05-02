export type EmploymentType = "Full-time" | "Contract" | "Part-time";
export type WorkplaceType = "Remote" | "Hybrid" | "On-site";

export type Role = {
  department: string;
  employmentType: EmploymentType;
  id: string;
  location: string;
  title: string;
  workplace: WorkplaceType;
};

export type RolesResponse = {
  roles: Role[];
};
