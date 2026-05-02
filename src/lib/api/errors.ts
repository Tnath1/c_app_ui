import type { ApiErrorResponse, ApiFieldErrors } from "@/types/api";

export class ApiError extends Error {
  fieldErrors?: ApiFieldErrors;
  status: number;

  constructor(message: string, status: number, fieldErrors?: ApiFieldErrors) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function parseApiError(response: Response) {
  let payload: Partial<ApiErrorResponse> = {};

  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  return new ApiError(
    payload.message || "Something went wrong. Please try again.",
    response.status,
    payload.fieldErrors,
  );
}
