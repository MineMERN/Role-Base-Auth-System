import { ApiError } from "./ApiError";
type EnsureFn = <T>(
  value: T, 
  err: { status: number; message: string }, 
  message?: string
) => asserts value is NonNullable<T>;

export const ensure: EnsureFn = (value, err, message) => {
  if (value === null || value === undefined) {
    throw new ApiError({ status: err.status, message: message ?? err.message });
  }
};