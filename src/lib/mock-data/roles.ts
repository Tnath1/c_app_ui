import type { Role } from "@/types/role";

export const mockRoles: Role[] = [
  {
    applicantCount: 3,
    description:
      "Build polished, responsive interfaces for recruiting workflows, working closely with product and backend teams to ship high-quality candidate experiences.",
    department: "Engineering",
    employmentType: "Full-time",
    id: "frontend-engineer",
    location: "Remote (Worldwide)",
    salaryRange: "$120,000 - $160,000",
    title: "Senior Frontend Engineer",
    workplace: "Remote",
  },
  {
    applicantCount: 5,
    description:
      "Design clean product flows for candidate and recruiter experiences, turning research and product requirements into precise interface systems.",
    department: "Design",
    employmentType: "Contract",
    id: "product-designer",
    location: "Lagos, Nigeria",
    salaryRange: "$60,000 - $90,000",
    title: "Product Designer",
    workplace: "Hybrid",
  },
  {
    applicantCount: 2,
    description:
      "Coordinate recruiting operations, candidate communication, and workflow quality across retained search engagements for global hiring teams.",
    department: "Talent Operations",
    employmentType: "Full-time",
    id: "talent-operations-coordinator",
    location: "Lagos, Nigeria",
    salaryRange: "$45,000 - $70,000",
    title: "Talent Operations Coordinator",
    workplace: "On-site",
  },
];
