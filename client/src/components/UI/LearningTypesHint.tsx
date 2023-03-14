import { learningTypeResources, useOneUserTest } from "@/lib";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { LearningTypePopover } from "./LearningTypePopover";

export const LearningTypesHint = () => {
  const { data: session } = useSession();
  const { data: test } = useOneUserTest();

  const learningResources = useMemo(
    () =>
      learningTypeResources.filter((resource) =>
        test!.learningTypes.includes(resource.type)
      ),
    [test]
  );

  return (
    <div className="not-prose border border-neutral border-opacity-50 p-5 rounded-xl shadow-lg">
      <h2 className="font-bold">{session?.user.name}</h2>
      <p className="text-xs opacity-60">Estilo de aprendizaje</p>

      <div className="space-y-1 mt-2">
        {learningResources.map((item) => (
          <LearningTypePopover key={item.type} {...item} position="right" />
        ))}
      </div>
    </div>
  );
};
