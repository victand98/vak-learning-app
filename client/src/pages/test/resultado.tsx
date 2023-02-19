import { DefaultLayout, PageTitle, TestOverview } from "@/components";
import { getSWRKey, TestService } from "@/lib";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import type { ReactElement } from "react";
import { SWRConfig } from "swr";
import { authOptions } from "../api/auth/[...nextauth]";
import type { NextPageWithLayout } from "../_app";

const TestResult: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Head>
        <title>Resultado</title>
      </Head>

      <PageTitle
        title="Resultado"
        leading="Resultado de la encuesta para la evaluación del estilo de aprendizaje"
      />

      <SWRConfig value={{ fallback: props.fallback }}>
        <div className="my-4">
          <TestOverview />
        </div>
      </SWRConfig>
    </>
  );
};

TestResult.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const test = await TestService.oneUser(session!);

  if (!test.data)
    return { redirect: { destination: "/test", permanent: false } };

  return {
    props: {
      session,
      fallback: { [getSWRKey(test.config)]: { data: test.data } },
    },
  };
};

export default TestResult;
