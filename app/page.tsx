"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PersonalInformationForm from "./registration/PersonalInformationForm";
import MarathonDetailsForm from "./registration/MarathonDetailsForm";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import { useRegistrationStore } from "@/store/useRegistration";

const RegistrationPage = () => {
  const router = useRouter();
  const { form } = useRegistrationStore();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    const setAllFieldsToShowError = () => {
      const event = new CustomEvent("showAllErrors");
      document.dispatchEvent(event);
    };

    setAllFieldsToShowError();

    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const isValidAge = (dateOfBirth: string | Date): boolean => {
    try {
      const dob = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
      const today = new Date();

      if (isNaN(dob.getTime())) return false;

      const yearDiff = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      let age = yearDiff;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      return age >= 5;
    } catch (error) {
      console.error("Error calculating age:", error);
      return false;
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (
          !form.firstName ||
          !form.lastName ||
          !form.email ||
          !form.mobile ||
          !form.gender ||
          !form.dateOfBirth ||
          !form.country ||
          !form.state ||
          !form.city ||
          !form.occupation
        ) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!isValidEmail(form.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        if (!isValidMobile(form.mobile)) {
          toast.error("Please enter a valid 10-digit mobile number");
          return false;
        }
        if (!isValidAge(form.dateOfBirth)) {
          toast.error("You must be at least 10 years old to participate");
          return false;
        }
        break;
      case 2:
        if (!form.raceCategory || !form.tShirtSize || !form.emergencyContactName || !form.emergencyContactNumber) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!isValidMobile(form.emergencyContactNumber)) {
          toast.error("Please enter a valid emergency contact number");
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
  
    try {
      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            personal_info: {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              mobile: form.mobile,
              gender: form.gender,
              dateOfBirth: form.dateOfBirth,
              country: form.country,
              state: form.state,
              city: form.city,
              occupation: form.occupation,
            },
            marathon_details: {
              raceCategory: form.raceCategory,
              tShirtSize: form.tShirtSize,
              emergencyContactName: form.emergencyContactName,
              emergencyContactNumber: form.emergencyContactNumber,
            },
          },
        ])
        .select();
  
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }
  
      // Send confirmation email
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: data[0],
        }),
      });
  
      if (!emailResponse.ok) {
        console.error('Failed to send confirmation email');
      }
  
      toast.success("Registration successful!");
      router.push("/registration/success");
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error(`Failed to submit registration: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  

  const renderStep = () => {
    if (step < 1) setStep(1);
    if (step > 2) setStep(2);

    switch (step) {
      case 1:
        return <PersonalInformationForm nextStep={nextStep} />;
      case 2:
        return <MarathonDetailsForm prevStep={prevStep} handleSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <Image
        src="/Firefly.png"
        alt="Jungle Background"
        fill
        className="w-full object-cover
        "
        priority
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto mt-32 space-y-5 p-2">
          <div className="flex justify-between p-4 w-full rounded-xl bg-gray-900/50 backdrop-blur">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${step >= i ? "bg-[#4CAF50]" : "bg-gray-600"} flex items-center justify-center`}>
                  <span className="text-lg font-semibold text-white">{i}</span>
                </div>
                <div className="ml-4">
                  <p className={`${step >= i ? "text-[#4CAF50]" : "text-gray-400"} font-bold`}>Step {i}</p>
                  <p className="text-sm text-gray-300">{i === 1 ? "Personal Details" : "Race Details"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[url('/bamboo-frame.png')] bg-contain bg-no-repeat" />
            <div className="relative z-10">{renderStep()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
