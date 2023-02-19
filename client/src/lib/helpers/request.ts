import { APIError } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Session } from "next-auth";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/",
});

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = async (error: AxiosError<APIError>) => {
  if (error.response) {
    const { data } = error.response;
    if (typeof data === "string") {
      return Promise.reject({
        errors: [
          {
            message:
              "Ha ocurrido un error inesperado. Por favor vuelva a intentarlo.",
          },
        ],
      } as APIError);
    }
    return Promise.reject(data);
  } else if (error.request) {
    return Promise.reject({
      errors: [
        {
          message:
            "No se ha podido establecer comunicación con el servidor, por favor, vuelva a intentarlo.",
        },
      ],
    } as APIError);
  }

  return Promise.reject({
    errors: [
      {
        message:
          "Ha ocurrido un error inesperado. Por favor vuelva a intentarlo.",
      },
    ],
  } as APIError);
};

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

request.interceptors.request.use((config) => {
  const session: Session | undefined = config.params?.session;
  const token: string | undefined = session?.user?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  delete config.params?.session;
  return config;
});

export { request };
