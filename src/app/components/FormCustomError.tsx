import React from "react";
import { cn } from "@/lib/utils";

interface FormCustomErrorType {
  message?: string | null;
  className?: string;
}

const FormCustomError: React.FC<FormCustomErrorType> = ({
  message,
  className,
}) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600",
        "animate-in fade-in slide-in-from-top-1 duration-200",
        className,
      )}
    >
      <span className="mt-0.5 text-red-500">⚠</span>
      <span className="leading-relaxed">{message}</span>
    </div>
  );
};

export default FormCustomError;
