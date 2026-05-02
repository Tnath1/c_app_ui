import { parseApiError } from "./errors";
import type {
  ApplicationSubmissionResponse,
  CandidateApplicationPayload,
} from "@/types/application";

export type ApplicationState = "error";

type SubmitApplicationOptions = {
  signal?: AbortSignal;
  state?: ApplicationState;
};

function getApplicationUrl(state?: ApplicationState) {
  const searchParams = new URLSearchParams();

  if (state) {
    searchParams.set("state", state);
  }

  const queryString = searchParams.toString();

  return queryString ? `/api/applications?${queryString}` : "/api/applications";
}

export async function submitApplication(
  application: CandidateApplicationPayload,
  options: SubmitApplicationOptions = {},
): Promise<ApplicationSubmissionResponse> {
  const response = await fetch(getApplicationUrl(options.state), {
    body: JSON.stringify(application),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    signal: options.signal,
  });

  if (!response.ok) {
    throw await parseApiError(response);
  }

  return (await response.json()) as ApplicationSubmissionResponse;
}
