import { DefaultLayout, PageTitle } from "@/components";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
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

Home.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return { props: { session } };
};

export default Home;
