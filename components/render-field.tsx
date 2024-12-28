import { useRegistrationStore } from "@/store/useRegistration";
import { RegistrationForm } from "@/types/form";

interface RenderFieldProps {
  label: string;
  name: keyof RegistrationForm;
  type?: string;
  placeholder: string;
  options?: string[];
}

export const RenderField: React.FC<RenderFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  options,
}) => {
  const { form: formData, handleChange } = useRegistrationStore();

  const commonClasses =
    "w-full bg-gray-900/50 backdrop-blur-2xl rounded-lg px-3 py-2 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50] border border-gray-700";

  return (
    <div>
      <label className="block text-white text-sm font-medium mb-1">
        {label}*
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name as keyof RegistrationForm]!.toString() || ""}
          onChange={handleChange}
          className={commonClasses}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name as keyof RegistrationForm]?.toString() || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
    </div>
  );
};
