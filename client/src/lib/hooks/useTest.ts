import { Test } from "@/types";
import { useSWRRequest } from "./useSWRRequest";

export const useOneUserTest = () => {
  const response = useSWRRequest<Test>({ url: "/api/test/user" });
  return response;
};
