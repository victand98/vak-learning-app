import { emailRegExp } from "@/lib";
import { SigninForm } from "@/types";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "./Alert";
import { Input } from "./Input";
import { NextLink } from "./NextLink";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>();

  const onSubmit: SubmitHandler<SigninForm> = async (data) => {
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: router.query.callbackUrl?.toString() || "/",
    });

    if (res?.error) setError(res.error);
    if (res?.url) router.push(res.url);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-6"
      noValidate
    >
      {error && <Alert color={error ? "failure" : "info"}>{error}</Alert>}

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
