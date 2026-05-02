export type ApiFieldErrors = Record<string, string[] | undefined>;

export type ApiErrorResponse = {
  fieldErrors?: ApiFieldErrors;
  message: string;
};
