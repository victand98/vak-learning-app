import { AuthLayout, RegisterForm } from "@/components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ ctx });
  const { callbackUrl = "/" } = ctx.query;
  if (session)
    return {
      redirect: { destination: callbackUrl.toString(), permanent: false },
    };

  return { props: { session } };
};

export default Register;
