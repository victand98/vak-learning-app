import {
  DefaultLayout,
  EmbedExercise,
  LearningTypesHint,
  PageTitle,
} from "@/components";
import { ExerciseService, getSWRKey, TestService } from "@/lib";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";
import { authOptions } from "./api/auth/[...nextauth]";
import type { NextPageWithLayout } from "./_app";

const Exercises: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Head>
        <title>Ejercicios</title>
      </Head>

      <PageTitle
        title="Ejercicios"
        leading="Resolución de ejercicios matemáticos"
      />

      <SWRConfig value={{ fallback: props.fallback }}>
        <div className="flex flex-col-reverse gap-1 lg:flex-row lg:gap-3 lg:items-start">
          <EmbedExercise />
          <LearningTypesHint />
        </div>
      </SWRConfig>
    </>
  );
};

Exercises.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const test = await TestService.oneUser(session!);

  if (!test.data)
    return { redirect: { destination: "/test", permanent: false } };

  const lastExercise = await ExerciseService.lastByUser(session!);

  return {
    props: {
      session,
      fallback: {
        [getSWRKey(test.config)]: { data: test.data },
        [getSWRKey(lastExercise.config)]: { data: lastExercise.data },
      },
    },
  };
};

export default Exercises;
