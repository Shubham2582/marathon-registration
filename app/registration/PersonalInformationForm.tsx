"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";
import { occupations } from "@/src/data/occupations";
import { fetchAddressFromPincode } from "@/services/pincodeService";
import { toast } from "react-hot-toast";
import { getCountries } from "@/src/data/locations";
import { validateName } from "@/utils/validation";
import { validatePostalCode, getPostalCodeFormat } from "@/utils/postalCodes";
import { bloodGroups } from "@/src/data/bloodGroups";
import { ImageUpload } from "@/components/image-upload";

interface PersonalInformationFormProps {
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ prevStep, handleSubmit }) => {
  const { form: formData, handleChange, setForm } = useRegistrationStore();
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    handleChange(e);
    const pincode = e.target.value;

    if (!pincode) {
      setForm("state", "");
      setForm("city", "");
      return;
    }

    // Only fetch address for Indian pincodes
    if (formData.country === "India" && pincode.length === 6) {
      setIsLoadingAddress(true);
      try {
        const addressData = await fetchAddressFromPincode(pincode);
        if (addressData) {
          setForm("state", addressData.State);
          setForm("city", addressData.District);
          toast.success("Address details fetched successfully!");
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to fetch address");
        setForm("state", "");
        setForm("city", "");
      } finally {
        setIsLoadingAddress(false);
      }
    }
  };

  const getMaxDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 5);
    return date.toISOString().split("T")[0];
  };

  const getRaceCategories = (gender: "MALE" | "FEMALE") => {
    return gender === "MALE" ? ["10km", "21km"] : ["5km", "10km", "21km"];
  };

  return (
    <BambooFrame>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-y-2 gap-x-20">
          {/* Add Race Category and T-Shirt Size at the top */}
          <RenderField
            label="Race Category / दौड़ श्रेणी"
            name="raceCategory"
            type="select"
            placeholder="Select Category"
            options={formData.gender ? getRaceCategories(formData.gender) : []}
            disabled={!formData.gender}
          />
          <RenderField
            label="T-Shirt Size / टी-शर्ट का आकार"
            name="tShirtSize"
            type="select"
            placeholder="Select Size"
            options={["S", "M", "L", "XL", "XXL"]}
          />

          <RenderField
            label="First Name / पहला नाम"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            validateInput={validateName}
            errorMessage="Please enter a valid name (letters only)"
          />
          <RenderField
            label="Last Name / अंतिम नाम"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            validateInput={validateName}
            errorMessage="Please enter a valid name (letters only)"
          />
          <RenderField
            label="Email / ईमेल"
            name="email"
            type="email"
            placeholder="Enter your email"
            validateInput={validateEmail}
            errorMessage="Please enter a valid email address"
          />
          <RenderField label="Date of Birth / जन्म तिथि" name="dateOfBirth" type="date" placeholder="" />
          <RenderField label="Country / देश" name="country" type="select" placeholder="Select Country" options={getCountries()} />
          <RenderField
            label="Postal Code / डाक कोड"
            name="pincode"
            type="text"
            placeholder={`Enter your ${formData.country === "India" ? "pincode" : "postal code"}`}
            validateInput={(value) => validatePostalCode(value, formData.country)}
            errorMessage={`Please enter a valid ${formData.country === "India" ? "pincode" : "postal code"} (${getPostalCodeFormat(formData.country)})`}
            onChange={handlePincodeChange}
          />
          <RenderField
            label="State / राज्य"
            name="state"
            type="text"
            placeholder="Enter pincode to auto-fill"
            disabled={true}
            errorMessage="Please enter pincode first"
            required={true}
          />
          <RenderField
            label="City / शहर"
            name="city"
            type="text"
            placeholder="Enter pincode to auto-fill"
            disabled={true}
            errorMessage="Please enter pincode first"
            required={true}
          />
          <RenderField label="Occupation / पेशा" name="occupation" type="select" placeholder="Select Occupation" options={occupations} />
          <RenderField label="Blood Group / रक्त समूह" name="bloodGroup" type="select" placeholder="Select Blood Group" options={bloodGroups} />
          <ImageUpload />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button type="submit" className="px-6 py-2 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors">
            Complete Registration
          </button>
        </div>
      </form>
    </BambooFrame>
  );
};

export default PersonalInformationForm;
