"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";
import { getCountries, getStates, getCities } from "@/src/data/locations";
import { occupations } from "@/src/data/occupations";

interface PersonalInformationFormProps {
  nextStep: () => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ nextStep }) => {
  const { form: formData, handleChange } = useRegistrationStore();

  const states = getStates(formData.country);
  const cities = getCities(formData.state);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  return (
    <BambooFrame>
      <div className="grid grid-cols-2 gap-y-2 gap-x-5">
        <RenderField label="First Name" name="firstName" type="text" placeholder="Enter your first name" />
        <RenderField label="Last Name" name="lastName" type="text" placeholder="Enter your last name" />
        <RenderField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          validateInput={validateEmail}
          errorMessage="Please enter a valid email address"
        />
        <RenderField
          label="Mobile Number"
          name="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          validateInput={validateMobile}
          errorMessage="Please enter a valid 10-digit mobile number"
        />
        <RenderField label="Date of Birth" name="dateOfBirth" type="date" placeholder="" />
        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">Gender*</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={formData.gender === "MALE"}
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
                checked={formData.gender === "FEMALE"}
                onChange={handleChange}
                className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span className="text-white text-sm">Female</span>
            </label>
          </div>
        </div>
        <RenderField label="Country" name="country" type="select" placeholder="Select Country" options={getCountries()} />
        <RenderField label="State" name="state" type="select" placeholder="Select State" options={states} />
        <RenderField label="City" name="city" type="select" placeholder="Select City" options={cities} />
        <RenderField label="Running Club" name="runningClub" type="text" placeholder="Enter running club name (optional)" required={false} />
        <RenderField label="Occupation" name="occupation" type="select" placeholder="Select Occupation" options={occupations} />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-white text-sm">Join the ultimate adventure in wilderness running</p>
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
