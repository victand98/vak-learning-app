import {
  ExerciseService,
  exerciseSources,
  useLastExerciseByUser,
  useRequest,
} from "@/lib";
import { NewExercise } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";

export const EmbedExercise = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: lastExercise } = useLastExerciseByUser();

  const getNextExercise = (limit: number = 11) => {
    const lastExerciseIndex = exerciseSources.findIndex(
      (exercise) => exercise.question === lastExercise?.question
    );
    if (lastExerciseIndex === limit) return exerciseSources[0];
    return exerciseSources[lastExerciseIndex + 1];
  };

  const nextExercise = getNextExercise();

  const { doRequest } = useRequest({
    request: ExerciseService.save,
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onMessageReceived = useCallback(
    (e: MessageEvent) => {
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
        if (data.completed) router.push("/test/resultado");
      }
    },
    [doRequest, router, session]
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceived, false);
    return () => {
      window.removeEventListener("message", onMessageReceived);
    };
  }, [onMessageReceived]);

  return (
    <iframe
      id="tutor_iframe"
      src={nextExercise.src}
      data-params={JSON.stringify(nextExercise.params)}
      className="w-full h-[675px] lg:flex-1"
    />
  );
};
