"use client";

import React, { useState } from "react";
import { BambooFrame } from "@/components/ui/bamboo-frame";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { toggleMusic } from "@/components/MusicPlayer";

interface MarathonDetailsFormProps {
  nextStep: () => void;
  handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

const MarathonDetailsForm: React.FC<MarathonDetailsFormProps> = ({ nextStep }) => {
  const { form, setForm } = useRegistrationStore();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpMethod, setOtpMethod] = useState<"whatsapp" | "email" | null>(null);
  const [generatedOTP, setGeneratedOTP] = useState<string>("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const startCooldown = () => {
    setCooldown(30);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const generateAndSendOTP = async () => {
    if (cooldown > 0) return;
    setIsSendingOTP(true);
    try {
      const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOTP(newOTP);

      const emailData = {
        userData: {
          personal_info: {
            email: form.email,
            firstName: "User",
            lastName: "",
          },
          marathon_details: {
            otp: newOTP,
          },
        },
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP email");
      }

      toast.success(`OTP sent to your ${otpMethod === "email" ? "email" : "mobile"}`);
      setShowOtpInput(true);
      startCooldown();
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    } finally {
      setIsSendingOTP(false);
    }
  };

  const verifyOTP = async () => {
    setIsVerifying(true);
    try {
      if (otp === generatedOTP) {
        toast.success("OTP verified successfully!");
        setIsOtpVerified(true);
        setShowOtpInput(false);
        await toggleMusic();
        nextStep();
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

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setForm("otp", value);
    setOtp(value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gender = e.target.value as "MALE" | "FEMALE";
    setForm("gender", gender);
    setForm("raceCategory", "");
  };

  const startOtpProcess = (method: "whatsapp" | "email") => {
    setOtpMethod(method);
    generateAndSendOTP();
  };

  const renderOTPModal = () => (
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

      <button
        type="button"
        onClick={generateAndSendOTP}
        disabled={cooldown > 0 || isSendingOTP}
        className="w-full mt-3 text-sm text-[#4CAF50] hover:text-[#45A049] disabled:text-gray-500"
      >
        {isSendingOTP ? "Sending OTP..." : cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
      </button>
    </div>
  );

  const renderSendOTPButtons = () => (
    <div className="flex gap-4 justify-center mt-4">
      <button
        type="button"
        onClick={() => startOtpProcess("whatsapp")}
        disabled={!form.mobile || isSendingOTP}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isSendingOTP ? "Sending..." : "Send OTP on WhatsApp"}
      </button>
      <button
        type="button"
        onClick={() => startOtpProcess("email")}
        disabled={!form.email || isSendingOTP}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isSendingOTP ? "Sending..." : "Send OTP on Email"}
      </button>
    </div>
  );

  return (
    <BambooFrame>
      <div className="space-y-4">
        <form className="md:space-y-8 space-y-4 md:pb-0 pb-4">
          {/* Contact Information */}
          <div className="md:grid flex md:grid-cols-2 flex-col md:gap-6 gap-3">
            <RenderField
              label="Mobile Number / मोबाइल नंबर"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              validateInput={validateMobile}
              errorMessage="Please enter a valid 10-digit mobile number"
            />
            <RenderField
              label="Email / ईमेल"
              name="email"
              type="email"
              placeholder="Enter your email"
              validateInput={validateEmail}
              errorMessage="Please enter a valid email address"
            />

            <div className="col-span-2">
              <label className="block text-white md:text-sm text-xs font-medium mb-2">Gender / लिंग *</label>
              <div className="flex md:gap-8 gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={form.gender === "MALE"}
                    onChange={handleGenderChange}
                    className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
                  />
                  <span className="text-white md:text-sm text-xs whitespace-nowrap">Male / पुरुष</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={form.gender === "FEMALE"}
                    onChange={handleGenderChange}
                    className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
                  />
                  <span className="text-white md:text-sm text-xs whitespace-nowrap">Female / महिला</span>
                </label>
              </div>
            </div>
          </div>

          {/* Add Bastar Checkbox */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.isFromBastar}
              onChange={(e) => setForm("isFromBastar", e.target.checked)}
              className="rounded text-[#4CAF50] focus:ring-[#4CAF50]"
            />
            <span className="text-white md:text-sm text-xs">Are you from Bastar? / क्या आप बस्तर से हैं?</span>
          </label>

          <div
            className={cn(
              "absolute w-screen h-screen flex items-center justify-center -top-24 left-0 bg-black/40 backdrop-blur",
              showOtpInput ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            )}
          >
            <div className="mx-auto px-4">
              <BambooFrame>
                <div className="relative space-y-4">
                  <div className="absolute right-2 top-2">
                    <button onClick={() => setShowOtpInput(false)} className="text-gray-400 hover:text-white" />
                  </div>
                  {renderOTPModal()}
                </div>
              </BambooFrame>
            </div>
          </div>

          {!showOtpInput && renderSendOTPButtons()}

          {showOtpInput && (
            <p className="text-center md:text-sm text-xs text-gray-300 mb-4">
              OTP sent via {otpMethod === "whatsapp" ? `WhatsApp (${form.mobile})` : `Email (${form.email})`}
            </p>
          )}

          {!isOtpVerified && (
            <div className="flex justify-end pt-6">
              <button onClick={toggleMusic} type="button" className="px-6 py-2 h-fit bg-gray-400 cursor-not-allowed text-white text-sm rounded-lg" disabled>
                Verify OTP to Continue
              </button>
            </div>
          )}
        </form>
      </div>
    </BambooFrame>
  );
};

export default MarathonDetailsForm;
