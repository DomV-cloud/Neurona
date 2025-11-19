import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
            error
              ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
