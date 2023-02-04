import { APIError } from "@/types";
import { useState } from "react";

interface Props<Response, Properties extends any[], Values> {
  request: (...args: Properties) => Promise<Response>;
  onSuccess?: (response: Response) => void;
  onError?: (err: APIError<Values>) => void;
}

export const useRequest = <
  Response,
  Properties extends any[],
  Values = Properties[0]
>(
  props: Props<Response, Properties, Values>
) => {
  const [error, setError] = useState<APIError<Values>>();
  const [response, setResponse] = useState<Response>();
  const [loading, setLoading] = useState(false);

  const doRequest = async (...args: Parameters<typeof props.request>) => {
    try {
      setLoading(true);
      setError(undefined);
      setResponse(undefined);
      const resp = await props.request(...args);
      setResponse(resp);
      if (props.onSuccess) props.onSuccess(resp);
      setLoading(false);
    } catch (err) {
      setError(err as APIError<Values>);
      if (props.onError) props.onError(err as APIError<Values>);
      setLoading(false);
    }
  };

  return { doRequest, error, response, loading };
};
