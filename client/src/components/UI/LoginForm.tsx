import { emailRegExp, handleFormError, useRequest, UserService } from "@/lib";
import { SigninForm } from "@/types";
import classNames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "./Alert";
import { Input } from "./Input";
import { NextLink } from "./NextLink";

export const LoginForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SigninForm>();

  const { doRequest, loading, error } = useRequest({
    request: UserService.signin,
    onSuccess: () => reset(),
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit: SubmitHandler<SigninForm> = (data) => {
    doRequest(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-6"
      noValidate
    >
      {error && (
        <Alert color={error ? "failure" : "info"}>
          {error.errors?.map((err) => (
            <p key={err.message}>{err.message}</p>
          ))}
        </Alert>
      )}

      <div>
        <Input
          name="email"
          label="Correo"
          placeholder="usuario@correo.com"
          register={register}
          options={{
            required: "El correo es un campo requerido",
            pattern: {
              value: emailRegExp,
              message: "El correo ingresado no es válido",
            },
          }}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          register={register}
          options={{ required: "La contraseña es un campo requerido" }}
          error={errors.password}
        />
      </div>

      <button
        type="submit"
        className={classNames("btn btn-primary btn-block", {
          loading: loading,
        })}
        disabled={loading}
      >
        Ingresar
      </button>

      <p className="text-sm font-light text-gray-500">
        ¿No tienes una cuenta?{" "}
        <NextLink href="/registrar" legacyBehavior>
          <a className="font-medium text-primary hover:underline">Regístrate</a>
        </NextLink>
      </p>
    </form>
  );
};
