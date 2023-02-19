import { useOneUserTest } from "@/lib";
import { LearningTypes } from "@/types/Enums";
import { Popover, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { Fragment, useMemo } from "react";
import { FaGoogleDrive } from "react-icons/fa";

export const TestOverview = () => {
  const { data: test } = useOneUserTest();
  const { data: session } = useSession();

  const learningResources = useMemo(
    () =>
      resources.filter((resource) =>
        test!.learningTypes.includes(resource.type)
      ),
    [test?.learningTypes]
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
              <Popover className="relative not-prose" key={item.type}>
                <Popover.Button className="badge capitalize badge-lg">
                  {item.type}
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/3 z-10 -translate-x-1/2 transform px-4 sm:px-0">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative bg-base-100 p-7">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-focus focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <FaGoogleDrive
                              aria-hidden="true"
                              className="h-full w-full text-primary"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              Ver en Google Drive
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const resources = [
  {
    type: LearningTypes.auditory,
    url: "https://drive.google.com/drive/u/1/folders/1ewv1-cAeByScwJoRWRQ72VmF1gy2QdCE",
    title: "Recursos para el estilo auditivo",
  },
  {
    type: LearningTypes.visual,
    url: "https://drive.google.com/drive/u/1/folders/12tttwkTJErljNJwiBfSU97K8uTX9096V",
    title: "Recursos para el estilo visual",
  },
  {
    type: LearningTypes.kinesthetic,
    url: "https://drive.google.com/drive/u/1/folders/1nf_Kp3nZsHP9ZYxEaRf5RJdSZ6N-Zyqh",
    title: "Recursos para el estilo kinestésico",
  },
];
