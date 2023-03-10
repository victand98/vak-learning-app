import {
  handleFormError,
  TestService,
  useOneUserTest,
  useQuestions,
  useRequest,
} from "@/lib";
import { QuestionAnswers, ResultAnswer, TestFormValues } from "@/types";
import { LearningTypes } from "@/types/Enums";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert } from "./Alert";

export const TestForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: questions, loading: loadingQuestions } = useQuestions();
  const { mutate } = useOneUserTest();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<TestFormValues>({ mode: "onChange" });

  const { doRequest, loading, error } = useRequest({
    request: TestService.save,
    onSuccess: async (res) => {
      await mutate(res);
      router.push("/test/resultado");
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  if (loadingQuestions) return <div>Cargando...</div>;

  const onSubmit: SubmitHandler<TestFormValues> = (data) => {
    const answers = getAnswers(data);
    const learningTypes = getMaxLearningTypes(answers, questions!);
    doRequest({ learningTypes, answers }, session!);
  };

  const getMaxLearningTypes = (
    answers: ResultAnswer[],
    questions: QuestionAnswers[]
  ): LearningTypes[] => {
    const learningTypesCount = new Map<LearningTypes, number>();

    answers.forEach((item) => {
      const question = questions.find((q) => q.id === item.question)!;
      const learningType = question.answers.find(
        (a) => a.id === item.answer
      )!.learningType;
      const count = learningTypesCount.get(learningType) ?? 0;
      learningTypesCount.set(learningType, count + 1);
    });

    const maxCount = Math.max(...learningTypesCount.values());
    const maxLearningTypes = Array.from(learningTypesCount.entries())
      .filter(([, count]) => count === maxCount)
      .map(([learningType]) => learningType);

    return maxLearningTypes;
  };

  const getAnswers = (data: TestFormValues): ResultAnswer[] =>
    Object.entries(data).map(([question, answer]) => ({
      question: parseInt(question),
      answer,
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && (
        <Alert color={error ? "failure" : "info"}>
          {error.errors?.map((err) => (
            <p key={err.message}>{err.message}</p>
          ))}
        </Alert>
      )}

      {questions?.map((question) => (
        <div
          key={question.id}
          className="border border-base-300 rounded-xl px-5 pb-5"
        >
          <h3>
            <span className="text-primary">{question.id}.</span>{" "}
            {question.title}
          </h3>

          <div>
            {question.answers.map((answer) => (
              <div key={answer.id} className="form-control w-auto md:w-80">
                <label className="label cursor-pointer" htmlFor={answer.id}>
                  <span className="label-text">{answer.title}</span>
                  <input
                    type="radio"
                    id={answer.id}
                    className="radio checked:bg-primary"
                    value={answer.id}
                    {...register(question.id.toString(), { required: true })}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className={classNames("btn btn-primary btn-block btn-lg", {
          loading: loading,
        })}
        disabled={!isValid || loading}
      >
        Enviar
      </button>
    </form>
  );
};
