import { APIError } from "@/types";
import { FieldValues, UseFormSetError } from "react-hook-form";

export const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const handleFormError = <T extends FieldValues = any>(
  err: APIError<T>,
  setError: UseFormSetError<T>
) => {
  for (const error of err.errors) {
    if (error.field)
      setError(error.field, { message: error.message }, { shouldFocus: true });
  }
};
