import { forwardRef, useState, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";
import { Typography } from "@ui";
import { WarningIcon } from "@phosphor-icons/react/dist/ssr";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, prefix, className, id, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const hasError = Boolean(error);

    const color = hasError ? "danger" : isFocused ? "blue" : "gray";

    return (
      <label className="flex flex-col gap-2 select-none">
        <Typography
          variant="xs"
          as="span"
          className={cn(
            color === "danger" && "text-danger",
            color === "blue" && "text-blue-base",
            color === "gray" && "text-gray-500",
          )}
        >
          {label}
        </Typography>

        <div
          className={cn(
            "flex h-12 items-center rounded-lg border-[1.5px] bg-white px-4 transition-colors duration-150",

            color === "danger" && "border-danger",
            color === "blue" && "border-blue-base",
            color === "gray" && "border-gray-300",
          )}
        >
          {prefix && (
            <Typography
              variant="md"
              as="span"
              className={cn(hasValue ? "text-gray-600" : "text-gray-400")}
              style={{ fontWeight: "normal" }}
            >
              {prefix}
            </Typography>
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              "caret-blue-base flex-1 bg-transparent text-[14px] leading-4 font-normal outline-none placeholder:text-gray-400 placeholder:select-none",
              className,
            )}
            {...props}

            onChange={(event) => {
              setHasValue(event.target.value.length > 0);
              props.onChange?.(event);
            }}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
          />
        </div>

        {error && (
          <div className="flex items-center justify-start gap-2">
            <WarningIcon className="fill-danger size-4" />
            <Typography variant="sm" className="text-gray-500">
              {error}
            </Typography>
          </div>
        )}
      </label>
    );
  },
);

TextField.displayName = "TextField";
