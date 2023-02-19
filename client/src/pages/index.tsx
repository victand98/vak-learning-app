import { DefaultLayout, PageTitle } from "@/components";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>

      <PageTitle
        title="Inicio"
        leading={`Te damos la bienvenida ${session?.user.name}`}
      />
    </>
  );
};

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
