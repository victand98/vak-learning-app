import { toHHMMSS, useExercisesByUser } from "@/lib";
import { TbMathFunction } from "react-icons/tb";

export const ExercisesOverview = () => {
  const { data: exercises } = useExercisesByUser();

  return (
    <div>
      <h2 className="text-lg">Ejercicios</h2>
      <p className="-mt-2 text-sm text-opacity-50">
        Resultados obtenidos de los ejercicios realizados
      </p>

      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 list-none">
        {exercises?.length === 0 && (
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <TbMathFunction className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  No se han realizado ejercicios aún
                </p>
              </div>
            </div>
          </li>
        )}

        {exercises?.map((exercise) => (
          <li className="pb-3 sm:pb-4" key={exercise.id}>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <TbMathFunction className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {exercise.question}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tiempo empleado
                  <span className="block">
                    {toHHMMSS(exercise.timeElapsed)}
                  </span>
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold">
                {exercise.totalErrors}{" "}
                {exercise.totalErrors === 1 ? "error" : "errores"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
