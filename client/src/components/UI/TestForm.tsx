import { handleFormError, TestService, useQuestions, useRequest } from "@/lib";
import { QuestionAnswers, ResultAnswer, TestFormValues } from "@/types";
import { LearningTypes } from "@/types/Enums";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const TestForm = () => {
  const { data: session } = useSession();
  const { data: questions, loading: loadingQuestions } = useQuestions();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<TestFormValues>({ mode: "onChange" });

  const { doRequest, loading, error } = useRequest({
    request: TestService.save,
    onSuccess: async () => {},
    onError: (err) => handleFormError(err, setError),
  });

  if (loadingQuestions) return <div>Cargando...</div>;

  const onSubmit: SubmitHandler<TestFormValues> = (data) => {
    const answers = getAnswers(data);
    const learningType = getLearningType(answers, questions!);

    doRequest({ learningType, answers }, session!);
  };

  const getLearningType = (
    answers: ResultAnswer[],
    questions: QuestionAnswers[]
  ): LearningTypes => {
    let auditoryCount: number = 0;
    let visualCount: number = 0;
    let kinestheticCount: number = 0;

    answers.forEach((item) => {
      const question = questions.find((q) => q.id === item.question)!;
      const answer = question.answers.find((a) => a.id === item.answer)!;

      switch (answer.learningType) {
        case LearningTypes.auditory:
          auditoryCount++;
          break;
        case LearningTypes.visual:
          visualCount++;
          break;
        case LearningTypes.kinesthetic:
          kinestheticCount++;
          break;
      }
    });

    console.log("auditoryCount", auditoryCount);
    console.log("visualCount", visualCount);
    console.log("kinestheticCount", kinestheticCount);

    let maxValue = Math.max(auditoryCount, visualCount, kinestheticCount);
    console.log("maxValue", maxValue);

    if (auditoryCount > visualCount && auditoryCount > kinestheticCount)
      return LearningTypes.auditory;
    if (visualCount > auditoryCount && visualCount > kinestheticCount)
      return LearningTypes.visual;
    if (kinestheticCount > auditoryCount && kinestheticCount > visualCount)
      return LearningTypes.kinesthetic;

    return LearningTypes.auditory;
  };

  const getAnswers = (data: TestFormValues): ResultAnswer[] =>
    Object.entries(data).map(([question, answer]) => ({
      question: parseInt(question),
      answer,
    }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions?.map((question) => (
        <div key={question.id}>
          <h3>
            <span className="text-primary">{question.id}.</span>{" "}
            {question.title}
          </h3>

          <div>
            {question.answers.map((answer) => (
              <div key={answer.id} className="form-control w-auto md:w-72">
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
        className={classNames("btn btn-primary btn-block", {
          loading: loading,
        })}
        disabled={!isValid || loading}
      >
        Enviar
      </button>
    </form>
  );
};
