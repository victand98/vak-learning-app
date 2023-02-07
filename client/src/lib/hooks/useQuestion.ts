import { QuestionAnswers } from "@/types";
import { useSWRRequest } from "./useSWRRequest";

export const useQuestions = () => {
  const response = useSWRRequest<QuestionAnswers[]>({ url: "/api/question/" });
  return response;
};
