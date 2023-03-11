import { ExerciseService, useRequest } from "@/lib";
import { NewExercise } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const EmbedExercise = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { doRequest } = useRequest({
    request: ExerciseService.save,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  useEffect(() => {
    window.addEventListener("message", onMessageReceived, false);
    return () => {
      window.removeEventListener("message", onMessageReceived);
    };
  }, []);

  const onMessageReceived = (e: MessageEvent) => {
    if (e.data && typeof e.data === "string") {
      let data: {
        question: string;
        errors: number;
        timeElapsed: number;
        completed?: boolean;
      } = JSON.parse(e.data);

      const newExercise: NewExercise = {
        user: session?.user.id!,
        question: data.question,
        totalErrors: data.errors,
        timeElapsed: data.timeElapsed,
      };
      doRequest(newExercise, session!);
      router.push("/test/resultado");
    }
  };

  return (
    <iframe
      id="tutor_iframe"
      src="/CTAT/HTML/4x=43.html"
      data-params='{"question_file":"/CTAT/FinalBRDs/4xI43.brd","problem_name":"cookies"}'
      className="w-full h-[675px] lg:flex-1"
    />
  );
};
