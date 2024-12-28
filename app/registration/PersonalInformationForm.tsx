"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";

interface PersonalInformationFormProps {
  nextStep: () => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  nextStep,
}) => {
  const { form, handleChange } = useRegistrationStore();

  return (
    <BambooFrame>
      <div className="grid grid-cols-2 gap-y-2 gap-x-5">
        <RenderField
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
        />
        <RenderField
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
        />
        <RenderField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <RenderField
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter your mobile number"
        />
        <RenderField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          placeholder=""
        />
        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Gender*
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={form.gender === "MALE"}
                onChange={handleChange}
                className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
              />{" "}
              <span className="text-white text-sm">Male</span>{" "}
            </label>{" "}
            <label className="flex items-center">
              {" "}
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={form.gender === "FEMALE"}
                onChange={handleChange}
                className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span className="text-white text-sm">Female</span>
            </label>
          </div>
        </div>
        <RenderField
          label="Country"
          name="country"
          type="select"
          placeholder="Select Country"
          options={["USA", "UK", "Canada", "Australia", "India"]}
        />
        <RenderField
          label="State"
          name="state"
          type="select"
          placeholder="Select State"
          options={["California", "New York", "Texas"]}
        />
        <RenderField
          label="City"
          name="city"
          type="select"
          placeholder="Select City"
          options={["Los Angeles", "San Francisco", "New York"]}
        />
        <RenderField
          label="Running Club"
          name="runningClub"
          type="text"
          placeholder="Enter running club name (optional)"
        />
        <RenderField
          label="Occupation"
          name="occupation"
          type="select"
          placeholder="Select Occupation"
          options={["Student", "Professional", "Self-Employed"]}
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-white text-sm">
          Join the ultimate adventure in wilderness running
        </p>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-2"
        >
          Next Step
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </BambooFrame>
  );
};

export default PersonalInformationForm;
