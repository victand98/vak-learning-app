import { DefaultLayout, PageTitle, TestForm } from "@/components";
import { TestService } from "@/lib";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const Test: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Cuestionario</title>
      </Head>

      <PageTitle
        title="Cuestionario"
        leading="Encuesta para la evaluación del estilo de aprendizaje"
      />

      <div className="my-4">
        <TestForm />
      </div>
    </>
  );
};

Test.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const { data: test } = await TestService.oneUser(session!);

  if (!test) return { props: { session } };
  return { redirect: { destination: "/test/resultado", permanent: false } };
};

export default Test;
