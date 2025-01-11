"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { validateName } from "@/utils/validation";

interface MarathonDetailsFormProps {
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const MarathonDetailsForm: React.FC<MarathonDetailsFormProps> = ({ prevStep, handleSubmit }) => {
  const { form, setForm } = useRegistrationStore();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const generateAndSendOTP = async () => {
    try {
      const generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

      const { error } = await supabase.from("otp_verifications").insert([
        {
          phone_number: form.mobile,
          otp: generatedOTP,
        },
      ]);

      if (error) throw error;

      toast.success(`OTP for verification: ${generatedOTP}`);
      setShowOtpInput(true);
    } catch (error) {
      toast.error("Failed to generate OTP");
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    setIsVerifying(true);
    try {
      const { data, error } = await supabase
        .from("otp_verifications")
        .select("*")
        .eq("phone_number", form.mobile)
        .eq("otp", otp)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        await handleSubmit(new Event("submit") as any);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("OTP verification failed");
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      generateAndSendOTP();
    } else {
      verifyOTP();
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setForm("otp", value);
    setOtp(value);
  };

  return (
    <BambooFrame>
      <div className="space-y-4">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <RenderField
                label="Race Category / दौड़ श्रेणी"
                name="raceCategory"
                type="select"
                placeholder="Select Category"
                options={["5k", "10k", "Half Marathon", "Full Marathon"]}
              />
            </div>

            <div className="space-y-2">
              <RenderField
                label="T-Shirt Size / टी-शर्ट का आकार"
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
                label="Emergency Contact Name / आपातकालीन संपर्क नाम"
                name="emergencyContactName"
                placeholder="Enter emergency contact name"
                validateInput={validateName}
                errorMessage="Please enter a valid name (letters only)"
              />
            </div>

            <div className="space-y-2">
              <RenderField
                label="Emergency Contact Number / आपातकालीन संपर्क नंबर"
                name="emergencyContactNumber"
                type="tel"
                placeholder="Enter emergency contact number"
                validateInput={validateMobile}
                errorMessage="Please enter a valid 10-digit mobile number"
              />
            </div>
          </div>

          <div
            className={`fixed inset-x-0 top-20 z-50 transform transition-all duration-300 ${
              showOtpInput ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            }`}
          >
            <div className="mx-auto max-w-md px-4">
              <BambooFrame>
                <div className="relative space-y-4">
                  <div className="absolute right-2 top-2">
                    <button onClick={() => setShowOtpInput(false)} className="text-gray-400 hover:text-white"></button>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur p-6 rounded-lg border border-gray-700">
                    <RenderField
                      label="Enter OTP / ओटीपी दर्ज करें"
                      name="otp"
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      required
                      onChange={handleOtpChange}
                      errorMessage="Please enter valid OTP"
                    />

                    <button
                      type="button"
                      onClick={verifyOTP}
                      disabled={isVerifying}
                      className="w-full mt-4 px-6 py-2 bg-[#4CAF50] text-white text-sm rounded-lg 
                     hover:bg-[#45A049] transition-colors disabled:bg-gray-600"
                    >
                      {isVerifying ? "Verifying..." : "Verify OTP"}
                    </button>

                    <button type="button" onClick={generateAndSendOTP} className="w-full mt-3 text-sm text-[#4CAF50] hover:text-[#45A049]">
                      Resend OTP
                    </button>
                  </div>
                </div>
              </BambooFrame>
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
              type="submit"
              onClick={onSubmitClick}
              disabled={isVerifying}
              className="px-6 py-2 h-fit bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors disabled:bg-gray-400"
            >
              {isVerifying ? "Verifying..." : showOtpInput ? "Verify OTP" : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </BambooFrame>
  );
};

export default MarathonDetailsForm;
