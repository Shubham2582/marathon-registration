import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";

interface MarathonDetailsFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const MarathonDetailsForm: React.FC<MarathonDetailsFormProps> = ({
  nextStep,
  prevStep,
}) => {
  const { form: formData, handleChange } = useRegistrationStore();

  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <RenderField
            label="Race Category"
            name="raceCategory"
            type="select"
            placeholder="Select Category"
            options={["5k", "10k", "Half Marathon", "Full Marathon"]}
          />
        </div>

        <div className="space-y-2">
          <RenderField
            label="T-Shirt Size"
            name="tShirtSize"
            type="select"
            placeholder="Select Size"
            options={["S", "M", "L", "XL", "XXL"]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <RenderField
            label="Emergency Contact Name"
            name="emergencyContactName"
            placeholder="Enter emergency contact name"
          />
        </div>

        <div className="space-y-2">
          <RenderField
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            type="tel"
            placeholder="Enter emergency contact number"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 h-fit bg-gray-700 text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 h-fit bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-2"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default MarathonDetailsForm;
