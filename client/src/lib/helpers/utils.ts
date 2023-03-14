import { APIError, Exercise } from "@/types";
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

export const toHHMMSS = (time: number) => {
  const sec_num = parseInt(time.toString(), 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export const groupByQuestion = (exercises: Exercise[]) => {
  const groupedExercises = exercises.reduce((acc, exercise) => {
    const { question } = exercise;
    if (!acc[question]) {
      acc[question] = [];
    }
    acc[question].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return Object.values(groupedExercises);
};
