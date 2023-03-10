import { LearningTypes } from "@/types/Enums";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaGoogleDrive } from "react-icons/fa";

export type LearningTypePopoverProps = {
  type: LearningTypes;
  url: string;
  title: string;
};

export const LearningTypePopover = (props: LearningTypePopoverProps) => {
  const { type, url, title } = props;

  return (
    <Popover className="relative not-prose" key={type}>
      <Popover.Button className="badge capitalize badge-lg">
        {type}
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
                href={url}
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
                  <p className="text-sm font-medium text-gray-800">{title}</p>
                  <p className="text-sm text-gray-500">Ver en Google Drive</p>
                </div>
              </a>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
