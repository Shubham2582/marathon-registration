'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import PersonalInformationForm from './PersonalInformationForm'
import MarathonDetailsForm from './MarathonDetailsForm'
import PaymentForm from './PaymentForm'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

const RegistrationPage = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    state: '',
    city: '',
    runningClub: '',
    occupation: '',
    // Marathon Details
    raceCategory: '',
    tShirtSize: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    // Payment Details
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  })

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }
  const prevStep = () => setStep(step - 1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateStep = () => {
    switch(step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.gender || !formData.dateOfBirth || !formData.country || !formData.state || !formData.city) {
          toast.error('Please fill in all required fields')
          return false
        }
        break
      case 2:
        if (!formData.raceCategory || !formData.tShirtSize || !formData.emergencyContactName || !formData.emergencyContactNumber) {
          toast.error('Please fill in all required fields')
          return false
        }
        break
      case 3:
        if (!formData.paymentMethod) {
          toast.error('Please select a payment method')
          return false
        }
        if (formData.paymentMethod === 'card' && (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv)) {
          toast.error('Please fill in all card details')
          return false
        }
        if (formData.paymentMethod === 'upi' && !formData.upiId) {
          toast.error('Please enter UPI ID')
          return false
        }
        if (formData.paymentMethod === 'netbanking' && (!formData.bankName || !formData.accountNumber || !formData.ifscCode)) {
          toast.error('Please fill in all netbanking details')
          return false
        }
        break
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep()) return

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            personal_info: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              mobile: formData.mobile,
              gender: formData.gender,
              dateOfBirth: formData.dateOfBirth,
              country: formData.country,
              state: formData.state,
              city: formData.city,
              runningClub: formData.runningClub,
              occupation: formData.occupation,
            },
            marathon_details: {
              raceCategory: formData.raceCategory,
              tShirtSize: formData.tShirtSize,
              emergencyContactName: formData.emergencyContactName,
              emergencyContactNumber: formData.emergencyContactNumber,
            },
            payment_info: {
              paymentMethod: formData.paymentMethod,
              transactionDetails: formData.paymentMethod === 'card' ? 'Card payment' :
                                formData.paymentMethod === 'upi' ? 'UPI payment' : 'Net banking payment'
            }
          }
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
      }

      console.log('Registration data:', data)
      toast.success('Registration successful!')
      router.push('/registration/success')
    } catch (error) {
      console.error('Error submitting registration:', error)
      toast.error(`Failed to submit registration: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return <PersonalInformationForm 
          formData={formData} 
          handleChange={handleChange} 
          nextStep={nextStep} 
        />
      case 2:
        return <MarathonDetailsForm 
          formData={formData} 
          handleChange={handleChange} 
          nextStep={nextStep} 
          prevStep={prevStep} 
        />
      case 3:
        return <PaymentForm 
          formData={formData} 
          handleChange={handleChange} 
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      default:
        return <PersonalInformationForm 
          formData={formData} 
          handleChange={handleChange} 
          nextStep={nextStep} 
        />
    }
  }

  useEffect(() => {
    // Reset form state when component mounts
    setStep(1)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      gender: '',
      dateOfBirth: '',
      country: '',
      state: '',
      city: '',
      runningClub: '',
      occupation: '',
      raceCategory: '',
      tShirtSize: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      paymentMethod: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      upiId: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
    })
  }, [])

  return (
    <div className="min-h-screen relative">
      <Image
        src="/Firefly.png"
        alt="Jungle Background"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 px-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${step >= i ? 'bg-[#4CAF50]' : 'bg-gray-600'} flex items-center justify-center`}>
                  <span className="text-lg font-semibold text-white">{i}</span>
                </div>
                <div className="ml-4">
                  <p className={`${step >= i ? 'text-[#4CAF50]' : 'text-gray-400'} font-medium`}>
                    Step {i}
                  </p>
                  <p className="text-sm text-gray-300">
                    {i === 1 ? 'Personal Details' : i === 2 ? 'Race Details' : 'Payment'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[url('/bamboo-frame.png')] bg-contain bg-no-repeat" />
            <div className="relative z-10">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage

