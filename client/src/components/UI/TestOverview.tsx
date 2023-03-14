import { learningTypeResources, useOneUserTest } from "@/lib";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { LearningTypePopover } from "./LearningTypePopover";

export const TestOverview = () => {
  const { data: test } = useOneUserTest();
  const { data: session } = useSession();

  const learningResources = useMemo(
    () =>
      learningTypeResources.filter((resource) =>
        test!.learningTypes.includes(resource.type)
      ),
    [test]
  );

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src="/learning.svg" alt="Resultado" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">¡Hola, {session?.user.name}! </h2>

        <div>
          <p className="my-1">
            Luego del proceso de evaluación, se ha determinado que{" "}
            {learningResources.length > 1
              ? "tus estilos de aprendizaje son: "
              : "tu estilo de aprendizaje es: "}
          </p>

          <div className="space-y-1">
            {learningResources.map((item) => (
              <LearningTypePopover key={item.type} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
