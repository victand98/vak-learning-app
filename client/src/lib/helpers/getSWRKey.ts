import { AxiosRequestConfig } from "axios";
import { unstable_serialize } from "swr";

export const getSWRKey = (axiosConfig: AxiosRequestConfig) => {
  const { url, method = "get", params = {} } = axiosConfig;
  return unstable_serialize([url, method, params]);
};
