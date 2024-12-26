'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'
import { BambooFrame } from '@/components/ui/bamboo-frame'

export default function RegistrationSuccess() {
  const router = useRouter()

  const handleReturnHome = () => {
    router.push('/registration')
  }

  return (
    <div className="min-h-screen relative">
      <Image
        src="/Firefly.png"
        alt="Jungle Background"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative min-h-screen flex items-center justify-center">
        <BambooFrame className="max-w-lg">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#4CAF50] mb-4">
              Registration Successful!
            </h1>
            <p className="text-gray-300 mb-8">
              Thank you for registering for the Jungle Adventure Racing. We look forward to seeing you at the event!
            </p>
            <button 
              onClick={handleReturnHome}
              className="px-8 py-3 bg-[#4CAF50] text-white font-medium rounded-lg hover:bg-[#45A049] transition-colors"
            >
              Return to Home
            </button>
          </div>
        </BambooFrame>
      </div>
    </div>
  )
}

