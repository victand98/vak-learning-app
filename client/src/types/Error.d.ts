import { FieldPath } from "react-hook-form";

export interface Error<T> {
  message: string;
  field?: FieldPath<T>;
}

export interface APIError<T = undefined> {
  errors: Base<T>[];
}
