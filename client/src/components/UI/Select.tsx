import classNames from "classnames";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type SelectProps<IFormValues extends FieldValues> =
  React.HTMLProps<HTMLSelectElement> & {
    name: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    rules: RegisterOptions<IFormValues>;
    error?: FieldError;
    helperText?: React.ReactNode;
    options: { value: string; label: string }[];
  };

export type SelectComponent = <T extends FieldValues>(
  props: SelectProps<T>
) => React.ReactElement;

export const Select: SelectComponent = (props) => {
  const {
    register,
    label,
    name,
    options,
    rules,
    helperText,
    error,
    className,
    placeholder,
    ...rest
  } = props;

  const selectClass = classNames("select select-bordered w-full", className, {
    "select-error": !!error,
  });

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label" htmlFor={name}>
          <span className="label-text">{label}</span>
        </label>
      )}

      <select
        className={selectClass}
        id={name}
        {...register(name, rules)}
        {...rest}
      >
        <option disabled value="">
          {placeholder}
        </option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

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
