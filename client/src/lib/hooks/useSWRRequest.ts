import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";
import { getSWRKey, request as httpRequest } from "../helpers";

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  loading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    "fallbackData"
  > {
  fallbackData?: Data;
}

export const useSWRRequest = <Data = unknown, Error = unknown>(
  request: GetRequest,
  config: Config<Data, Error> = {}
): Return<Data, Error> => {
  const { fallbackData, ...restConfig } = config;

  const { data: session } = useSession();

  const finalRequest: GetRequest = {
    ...request,
    params: { ...request?.params, session },
  };

  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    getSWRKey(request!),
    () => httpRequest.request<Data>(finalRequest),
    {
      ...restConfig,
      fallbackData: fallbackData
        ? ({
            status: 200,
            statusText: "InitialData",
            config: finalRequest,
            data: fallbackData,
          } as AxiosResponse<Data>)
        : undefined,
    }
  );

  return {
    data: response && response.data,
    response,
    loading: !error && !response,
    error,
    isValidating,
    mutate,
  };
};
