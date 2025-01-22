import React, { useState, useEffect, ChangeEvent } from "react";
import { useRegistrationStore } from "@/store/useRegistration";
import { RegistrationForm } from "@/types/form";

interface RenderFieldProps {
  label: string;
  name: keyof RegistrationForm;
  type?: string;
  placeholder: string;
  options?: readonly string[] | string[];
  required?: boolean;
  validateInput?: (value: string) => boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void | Promise<void>;
  max?: string;
}

export const RenderField: React.FC<RenderFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  options,
  required = true,
  validateInput,
  errorMessage = "This field is required",
  disabled = false,
  onChange,
  max,
}) => {
  const { form: formData, handleChange } = useRegistrationStore();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const handleShowAllErrors = () => {
      setShowError(true);
    };
    document.addEventListener("showAllErrors", handleShowAllErrors);
    return () => {
      document.removeEventListener("showAllErrors", handleShowAllErrors);
    };
  }, []);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShowError(false);
    if (onChange) {
      await onChange(e);
    } else {
      handleChange(e);
    }
  };

  const value = formData[name]?.toString() || "";
  const isFieldEmpty = required && !value;
  const isFieldInvalid = isFieldEmpty || (value && validateInput && !validateInput(value));
  const showFieldError = showError && isFieldInvalid;

  const commonClasses =
    "w-full bg-gray-900/50 backdrop-blur-2xl rounded-lg px-3 py-2 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50] border border-gray-700";

  return (
    <div>
      <label className="block text-white md:text-sm text-xs font-medium mb-1">
        {label}
        {required && "*"}
      </label>
      <div className="relative">
        {type === "select" ? (
          <div>
            <select
              name={name}
              value={value}
              onChange={handleInputChange}
              className={`${commonClasses} ${showFieldError ? "border-red-500" : ""} ${disabled ? "bg-gray-700/50 cursor-not-allowed" : ""}`}
              onBlur={() => setShowError(true)}
              disabled={disabled}
            >
              <option value="">{placeholder}</option>
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {showFieldError && <p className="text-red-500 text-xs mt-1">{value && validateInput ? errorMessage : "This field is required"}</p>}
          </div>
        ) : (
          <div>
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`${commonClasses} ${showFieldError ? "border-red-500" : ""}`}
              onBlur={() => setShowError(true)}
              disabled={disabled}
              max={max}
            />
            {showFieldError && (
              <p className="text-red-500 text-xs mt-1">{disabled ? errorMessage : value && validateInput ? errorMessage : "This field is required"}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
