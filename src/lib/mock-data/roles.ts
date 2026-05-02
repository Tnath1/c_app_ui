import type { Role } from "@/types/role";

export const mockRoles: Role[] = [
  {
    department: "Engineering",
    employmentType: "Full-time",
    id: "frontend-engineer",
    location: "Remote",
    title: "Frontend Engineer",
    workplace: "Remote",
  },
  {
    department: "Design",
    employmentType: "Contract",
    id: "product-designer",
    location: "Lagos, Nigeria",
    title: "Product Designer",
    workplace: "Hybrid",
  },
  {
    department: "Operations",
    employmentType: "Full-time",
    id: "operations-coordinator",
    location: "Abuja, Nigeria",
    title: "Operations Coordinator",
    workplace: "On-site",
  },
  {
    department: "Customer Success",
    employmentType: "Part-time",
    id: "customer-success-associate",
    location: "Remote",
    title: "Customer Success Associate",
    workplace: "Remote",
  },
];
