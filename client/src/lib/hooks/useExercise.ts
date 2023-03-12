import { Exercise } from "@/types";
import { useSWRRequest } from "./useSWRRequest";

export const useExercisesByUser = () => {
  const response = useSWRRequest<Exercise[]>({ url: "/api/exercise/user" });
  return response;
};
