import classNames from "classnames";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputProps<IFormValues extends FieldValues> =
  React.HTMLProps<HTMLInputElement> & {
    name: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    options: RegisterOptions<IFormValues>;
    error?: FieldError;
    helperText?: React.ReactNode;
    multiline?: boolean;
  };

export type InputComponent = <T extends FieldValues>(
  props: InputProps<T>
) => React.ReactElement;

export const Input: InputComponent = (props) => {
  const {
    register,
    label,
    name,
    options,
    helperText,
    error,
    multiline = false,
    className,
    ...rest
  } = props;

  const inputClass = classNames(
    "w-full sm:text-sm rounded-lg p-2.5",
    className,
    {
      "input input-bordered": !multiline,
      "textarea textarea-bordered": multiline,
      "input-error": !!error && !multiline,
      "textarea-error": !!error && multiline,
    }
  );

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      {multiline ? (
        <textarea className={inputClass} {...register(name, options)} />
      ) : (
        <input className={inputClass} {...register(name, options)} {...rest} />
      )}

      <label className="label">
        {helperText && !error && (
          <span className="label-text-alt">{helperText}</span>
        )}
        {error && (
          <span className="label-text-alt text-error">{error.message}</span>
        )}
      </label>
    </div>
  );
};
