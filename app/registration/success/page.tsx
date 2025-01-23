"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { BambooFrame } from "@/components/ui/bamboo-frame";

export default function RegistrationSuccess() {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen relative">
      <Image src="/bg-image.jpg" alt="Jungle Background" fill className="absolute w-screen min-h-screen object-cover md:block hidden" priority />
      <Image src="/mobile/background.png" alt="Jungle Background" fill className="absolute w-screen h-screen top-0 object-cover block md:hidden" priority />

      <div className="relative min-h-screen flex items-center justify-center">
        <Image src="/mobile/box.png" height={700} width={400} alt="Box" className="absolute w-full h-full object-cover object-top block md:hidden" priority />
        <BambooFrame className="max-w-lg z-10">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-6" />
            <h1 className="md:text-3xl text-xl font-bold text-[#4CAF50] mb-4">Registration Successful!</h1>
            <p className="text-gray-300 mb-8 md:text-base text-sm w-2/3 mx-auto">
              Thank you for registering for the Abujhmad Peace Marathon. We look forward to seeing you at the event!
            </p>
            <button
              onClick={handleReturnHome}
              className="md:px-8 md:py-3 px-4 py-2 md:text-base text-sm bg-[#4CAF50] text-white font-medium rounded-lg hover:bg-[#45A049] transition-colors"
            >
              Return to Home
            </button>
          </div>
        </BambooFrame>
      </div>
    </div>
  );
}
