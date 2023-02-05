import { DefaultLayout } from "@/components";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { data } = useSession();

  console.log(data);

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>

      <div>Home</div>

      <button
        className="btn btn-secondary"
        onClick={async () => {
          const res = await signOut({
            redirect: false,
            callbackUrl: "/ingresar",
          });
          router.push(res.url);
        }}
      >
        Salir
      </button>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
