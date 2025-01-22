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

  const validateStep = () => {
    console.log("Validating step", step);
    console.log("Missing fields:", {
      dateOfBirth: !form.dateOfBirth,
      selfie: !form.selfie,
      raceCategory: !form.raceCategory,
      tShirtSize: !form.tShirtSize,
    });

    switch (step) {
      case 1:
        if (!form.gender || !form.mobile || !form.email) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (!isValidMobile(form.mobile)) {
          toast.error("Please enter a valid 10-digit mobile number");
          return false;
        }
        return true;

      case 2:
        const requiredFields = {
          "First Name": form.firstName,
          "Last Name": form.lastName,
          "Date of Birth": form.dateOfBirth,
          Country: form.country,
          State: form.state,
          City: form.city,
          Occupation: form.occupation,
          "Race Category": form.raceCategory,
          "T-Shirt Size": form.tShirtSize,
        };

        const missingFields = Object.entries(requiredFields)
          .filter(([value]) => !value)
          .map(([key]) => key);

        if (missingFields.length > 0) {
          toast.error(`Please fill in: ${missingFields.join(", ")}`);
          return false;
        }

        if (!isValidEmail(form.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started");
    console.log("Current form data:", form);

    const isValid = validateStep();
    console.log("Form validation result:", isValid);

    if (!isValid) {
      console.log("Form validation failed");
      return;
    }

    try {
      const { error: tableError } = await supabase.from("registrations").select("id").limit(1);

      if (tableError) {
        console.error("Table verification failed:", tableError);
        throw new Error("Database table structure verification failed");
      }

      console.log("Preparing data for Supabase insertion...");
      const registrationData = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mobile: form.mobile,
        gender: form.gender,
        date_of_birth: form.dateOfBirth,
        country: form.country,
        state: form.state,
        city: form.city,
        occupation: form.occupation,
        race_category: form.raceCategory,
        t_shirt_size: form.tShirtSize,
        emergency_contact_name: form.emergencyContactName || null,
        emergency_contact_number: form.emergencyContactNumber || null,
        blood_group: form.bloodGroup || null,
        is_from_bastar: form.isFromBastar,
        needs_accommodation: form.needsAccommodation,
      };

      console.log("Sending data to Supabase:", registrationData);

      const { data, error } = await supabase
        .from("registrations")
        .insert([registrationData])
        .select("id");

      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }

      try {
        const emailData = {
          userData: {
            personal_info: {
              email: form.email,
              firstName: form.firstName,
              lastName: form.lastName,
            },
            marathon_details: {
              raceCategory: form.raceCategory,
              tShirtSize: form.tShirtSize,
            },
          },
        };

        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
        }
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      console.log("Registration successful, ID:", data?.[0]?.id);
      toast.success(
        "Registration successful! Check your email for confirmation."
      );
      router.push("/registration/success");
    } catch (error) {
      console.error("Full error object:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  };

  const renderStep = () => {
    if (step < 1) setStep(1);
    if (step > 2) setStep(2);

    switch (step) {
      case 1:
        return <MarathonDetailsForm nextStep={nextStep} />;
      case 2:
        return (
          <PersonalInformationForm
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative pt-20">
      <Image
        src="/Firefly.png"
        alt="Jungle Background"
        fill
        className="absolute w-screen min-h-screen object-cover md:block hidden"
        priority
      />
      <Image
        src="/mobile/background.png"
        alt="Jungle Background"
        fill
        className="absolute w-screen h-screen top-0 object-cover block md:hidden"
        priority
      />

      <div className="relative md:w-full mx-auto flex flex-col flex-grow items-center justify-center md:px-4 sm:px-12">
        <Image
          src="/mobile/box.png"
          height={700}
          width={400}
          alt="Box"
          className="absolute w-full h-full object-cover object-top block md:hidden"
          priority
        />
        <div className="relative h-36 w-2/3 z-10 sm:mt-10 mt-7 flex justify-center items-center">
          <Image
            src="/mobile/header-background.png"
            height={300}
            width={100}
            alt="Box"
            className="absolute w-full h-full object-contain block md:hidden"
            priority
          />
          <h2 className="z-10 md:hidden sm:text-3xl text-2xl font-bold text-center text-white">Abujmaad<br/>Registration</h2>
        </div>

        <div className="w-full max-w-2xl mx-auto md:mt- space-y-5 p-2 z-10">
          <div className="flex justify-between p-4 w-full rounded-xl md:bg-gray-900/50 md:backdrop-blur">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full ${
                    step >= i ? "bg-[#4CAF50]" : "bg-gray-600"
                  } flex items-center justify-center`}
                >
                  <span className="text-lg font-semibold text-white">{i}</span>
                </div>
                <div className="ml-4">
                  <p
                    className={`${
                      step >= i ? "text-[#4CAF50]" : "text-gray-400"
                    } font-bold`}
                  >
                    Step {i}
                  </p>
                  <p className="text-sm text-gray-300">
                    {i === 1 ? "Race Details" : "Personal Details"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6">
            <div className="z-10">{renderStep()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
