import { useQuestions } from "@/lib";
import React from "react";

export const TestForm = () => {
  const { data, loading } = useQuestions();

  if (loading) return <div>cargando...</div>;

  return (
    <div>
      {data?.map((question) => (
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
                    name={question.id}
                    id={answer.id}
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
