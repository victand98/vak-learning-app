import { DefaultLayout } from "@/components";
import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const TestResult: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Resultado</title>
      </Head>

      <div>TestResult</div>
    </>
  );
};

TestResult.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default TestResult;
