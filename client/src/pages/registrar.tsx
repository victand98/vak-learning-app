import { AuthLayout, RegisterForm } from "@/components";
import Head from "next/head";
import { ReactElement } from "react";

const Register = () => {
  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>

      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Registrar nueva cuenta
      </h1>

      <RegisterForm />
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
