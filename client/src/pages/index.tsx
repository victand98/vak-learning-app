import { DefaultLayout } from "@/components";
import Head from "next/head";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Ingresar</title>
      </Head>

      <div>Home</div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
