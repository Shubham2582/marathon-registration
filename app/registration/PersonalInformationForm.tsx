'use client'

import React from 'react'
import { ChevronRight } from 'lucide-react'
import { BambooFrame } from '@/components/ui/bamboo-frame'

interface PersonalInformationFormProps {
  formData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  nextStep: () => void
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ 
  formData, 
  handleChange, 
  nextStep 
}) => {
  const renderField = (label: string, name: string, type: string, placeholder: string, options?: string[]) => {
    const commonClasses = "w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50] border border-gray-700"

    return (
      <div className="space-y-1">
        <label className="block text-white text-sm font-medium">
          {label}*
        </label>
        {type === 'select' ? (
          <select
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            className={commonClasses}
          >
            <option value="">{placeholder}</option>
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={formData[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className={commonClasses}
          />
        )}
      </div>
    )
  }

  return (
    <BambooFrame>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#4CAF50]">
          Personal Information
        </h1>
        <p className="text-gray-300 mt-2">Tell us about yourself</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {renderField('First Name', 'firstName', 'text', 'Enter your first name')}
        {renderField('Last Name', 'lastName', 'text', 'Enter your last name')}
        {renderField('Email', 'email', 'email', 'Enter your email')}
        {renderField('Mobile Number', 'mobile', 'tel', 'Enter your mobile number')}
        {renderField('Date of Birth', 'dateOfBirth', 'date', '')}

        <div className="space-y-1">
          <label className="block text-white text-sm font-medium">
            Gender*
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span className="text-white text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                className="mr-2 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span className="text-white text-sm">Female</span>
            </label>
          </div>
        </div>

        {renderField('Country', 'country', 'select', 'Select Country', ['USA', 'UK', 'Canada', 'Australia', 'India'])}
        {renderField('State', 'state', 'select', 'Select State', ['California', 'New York', 'Texas'])}
        {renderField('City', 'city', 'select', 'Select City', ['Los Angeles', 'San Francisco', 'New York'])}
        {renderField('Running Club', 'runningClub', 'text', 'Enter running club name (optional)')}
        {renderField('Occupation', 'occupation', 'select', 'Select Occupation', ['Student', 'Professional', 'Self-Employed'])}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-white/90 text-sm">
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
  )
}

export default PersonalInformationForm

