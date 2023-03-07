import { emailRegExp, handleFormError, useRequest, UserService } from "@/lib";
import { SignupForm } from "@/types";
import { Genders } from "@/types/Enums";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "./Alert";
import { Input } from "./Input";
import { NextLink } from "./NextLink";
import { Select } from "./Select";

export const RegisterForm = () => {
  const router = useRouter();
  const [customError, setCustomError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<SignupForm>();

  const { doRequest, loading, error } = useRequest({
    request: UserService.signup,
    onSuccess: async () => {
      const { email, password } = getValues();
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      if (res?.error) setCustomError(res.error);
      if (res?.url) router.push(res.url);
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    doRequest(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 md:space-y-6"
      noValidate
    >
      {customError && (
        <Alert color={customError ? "failure" : "info"}>{customError}</Alert>
      )}

      {error && (
        <Alert color={error ? "failure" : "info"}>
          {error.errors?.map((err) => (
            <p key={err.message}>{err.message}</p>
          ))}
        </Alert>
      )}

      <div>
        <Input
          name="firstName"
          label="Nombre"
          placeholder="Escribe tu nombre"
          register={register}
          options={{
            required: "El nombre es un campo requerido",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          }}
          error={errors.firstName}
        />

        <Input
          name="lastName"
          label="Apellido"
          placeholder="Escribe tu apellido"
          register={register}
          options={{
            required: "El apellido es un campo requerido",
            minLength: {
              value: 3,
              message: "El apellido debe tener al menos 3 caracteres",
            },
          }}
          error={errors.lastName}
        />

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
          options={{
            required: "La contraseña es un campo requerido",
            minLength: {
              value: 4,
              message: "La contraseña debe tener al menos 4 caracteres",
            },
            maxLength: {
              value: 20,
              message: "La contraseña debe tener máximo 20 caracteres",
            },
          }}
          error={errors.password}
        />

        <Input
          name="age"
          label="Edad"
          placeholder="Escribe tu edad"
          register={register}
          options={{
            required: "La edad es un campo requerido",
            min: { value: 5, message: "La edad debe ser mayor a 5 años" },
            max: { value: 100, message: "La edad debe ser menor a 100 años" },
          }}
          error={errors.age}
        />

        <Select
          name="gender"
          label="Género"
          defaultValue={Genders.other}
          placeholder="Selecciona tu género"
          register={register}
          rules={{ required: "El género es un campo requerido" }}
          options={Object.values(Genders).map((gender) => ({
            label: gender,
            value: gender,
          }))}
        />

        <Input
          name="educationalUnit"
          label="Unidad Educativa"
          placeholder="Escribe el nombre de tu unidad educativa"
          register={register}
          options={{
            required: "El nombre de la unidad educativa es un campo requerido",
            minLength: {
              value: 3,
              message:
                "El nombre de la unidad educativa debe tener al menos 3 caracteres",
            },
          }}
          error={errors.educationalUnit}
        />

        <Input
          name="course"
          label="Curso"
          placeholder="Escribe el curso al que perteneces"
          register={register}
          options={{
            required: "El curso es un campo requerido",
            minLength: {
              value: 1,
              message: "El curso debe tener al menos 1 caracter",
            },
          }}
          error={errors.course}
        />
      </div>

      <button
        type="submit"
        className={classNames("btn btn-primary btn-block", {
          loading: loading,
        })}
        disabled={loading}
      >
        Registrar
      </button>

      <p className="text-sm font-light text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <NextLink href="/ingresar" legacyBehavior>
          <a className="font-medium text-primary hover:underline">
            Ingresa ahora
          </a>
        </NextLink>
      </p>
    </form>
  );
};
