import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/core/utils/cn";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  errorMessage?: string;
}

export function Textarea({ label, errorMessage, ...props }: TextareaProps) {
  return (
    <div>
      <div className="relative pr-1.5">
        <textarea
          className="peer w-full rounded-lg px-3.5 py-4 transition-colors ease-[0.4,0,0.2,1] focus:outline-0"
          id={props.name}
          {...props}
          rows={props.rows || 4}
        ></textarea>
        <label
          className={cn(
            "-translate-y-2 absolute top-0 left-0 translate-x-3.5 font-semibold text-xs",
            "peer-focus:text-gray-800",
            "transition-colors duration-150 ease-[0.4,0,0.2,1]",
            errorMessage ? "text-error!" : "text-gray-600",
          )}
          htmlFor={props.name}
        >
          {label}
        </label>

        <fieldset
          className={cn(
            "-top-2 pointer-events-none absolute inset-x-0 bottom-0 rounded-lg border px-2",
            "peer-hover:border-gray-800 peer-focus:border-2 peer-focus:border-gray-800",
            "transition-[border-color] duration-150 ease-[0.4,0,0.2,1]",
            errorMessage ? "border-error!" : "border-gray-600/20",
          )}
        >
          <legend className="px-1.5 text-xs opacity-0">{label}</legend>
        </fieldset>
      </div>

      <div>
        <p className="mt-1.5 ml-2.5 text-error text-xs">{errorMessage}</p>
      </div>
    </div>
  );
}
