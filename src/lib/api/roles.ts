import { parseApiError } from "./errors";
import type { Role, RolesResponse } from "@/types/role";

type RoleState = "empty" | "error";

type GetRolesOptions = {
  signal?: AbortSignal;
  state?: RoleState;
};

function getRolesUrl(state?: RoleState) {
  const searchParams = new URLSearchParams();

  if (state) {
    searchParams.set("state", state);
  }

  const queryString = searchParams.toString();

  return queryString ? `/api/roles?${queryString}` : "/api/roles";
}

export async function getRoles(options: GetRolesOptions = {}): Promise<Role[]> {
  const response = await fetch(getRolesUrl(options.state), {
    cache: "no-store",
    signal: options.signal,
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  const data = (await response.json()) as RolesResponse;

  return data.roles;
}
