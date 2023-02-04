import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";
import { HiX } from "react-icons/hi";

export interface AlertProps
  extends PropsWithChildren<Omit<ComponentProps<"div">, "color">> {
  additionalContent?: ReactNode;
  color?: keyof AlertColors;
  icon?: FC<ComponentProps<"svg">>;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
  withBorderAccent?: boolean;
}

export interface AlertColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
  gray: string;
}

const colors: AlertColors = {
  info: "text-blue-700 bg-blue-100 border-blue-500 dark:bg-blue-200 dark:text-blue-800",
  gray: "text-gray-700 bg-gray-100 border-gray-500 dark:bg-gray-700 dark:text-gray-300",
  failure:
    "text-red-700 bg-red-100 border-red-500 dark:bg-red-200 dark:text-red-800",
  success:
    "text-green-700 bg-green-100 border-green-500 dark:bg-green-200 dark:text-green-800",
  warning:
    "text-yellow-700 bg-yellow-100 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-800",
};

const closeButtonColors: AlertColors = {
  info: "bg-blue-100 text-blue-500 hover:bg-blue-200 focus:ring-blue-400 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300",
  gray: "bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
  failure:
    "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300",
  success:
    "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300",
  warning:
    "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 focus:ring-yellow-400 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300",
};

export const Alert: FC<AlertProps> = ({
  additionalContent,
  children,
  color = "info",
  icon: Icon,
  onDismiss,
  rounded = true,
  withBorderAccent,
  className,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2 p-4 text-sm",
        colors[color],
        rounded && "rounded-lg",
        withBorderAccent && "border-t-4",
        className
      )}
      role="alert"
    >
      <div className="flex items-center">
        {Icon && <Icon className="mr-3 inline h-5 w-5 flex-shrink-0" />}
        <div>{children}</div>
        {typeof onDismiss === "function" && (
          <button
            aria-label="Dismiss"
            className={classNames(
              "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2",
              closeButtonColors[color]
            )}
            onClick={onDismiss}
            type="button"
          >
            <HiX aria-hidden className="w-5 h-5" />
          </button>
        )}
      </div>
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
};
