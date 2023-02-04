import { AuthLayout, LoginForm } from "@/components";
import Head from "next/head";
import { ReactElement } from "react";

const Login = () => {
  return (
    <>
      <Head>
        <title>Ingresar</title>
      </Head>

      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Ingresar a tu cuenta
      </h1>

      <LoginForm />
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
