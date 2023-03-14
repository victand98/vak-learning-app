import { Exercise } from "@/types";
import { useSWRRequest } from "./useSWRRequest";

export const useExercisesByUser = () => {
  const response = useSWRRequest<Exercise[]>({ url: "/api/exercise/user" });
  return response;
};

export const useLastExerciseByUser = () => {
  const response = useSWRRequest<Exercise | null>(
    { url: "/api/exercise/last/user" },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: false,
    }
  );
  return response;
};
