import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useRegistration } from './RegistrationContext';
import { countries } from '../data/countries';
import { indianStates } from '../data/indianStates';
import { citiesByState } from '../data/cities';
import { occupations } from '../data/occupations';
import backgroundImage from '../images/Firefly.png';


// Then in your component:
<div 
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${backgroundImage})`
  }}
/>


const PersonalInformationForm = () => {
  const { formData, updateFormData, setCurrentStep } = useRegistration();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    // Reset city when state changes
    if (name === 'state') {
      updateFormData({ city: '' });
    }
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`  // Fix the template literal syntax
        }}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="h-32" />

          {/* Progress steps */}
          <div className="flex justify-center items-center gap-4 mb-8 mt-12">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm">
                <span className="text-white">1</span>
              </div>
              <span className="ml-2 text-white text-sm">Personal</span>
            </div>
            <div className="w-8 h-px bg-[#2F4F2F]" />
            <div className="flex items-center opacity-60">
              <div className="w-6 h-6 rounded-full border border-[#2F4F2F] flex items-center justify-center text-sm">
                <span className="text-white">2</span>
              </div>
              <span className="ml-2 text-white text-sm">Category</span>
            </div>
            <div className="w-8 h-px bg-[#2F4F2F]" />
            <div className="flex items-center opacity-60">
              <div className="w-6 h-6 rounded-full border border-[#2F4F2F] flex items-center justify-center text-sm">
                <span className="text-white">3</span>
              </div>
              <span className="ml-2 text-white text-sm">Payment</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-16 mb-8">
            {/* Basic Information */}
            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Mobile Number*
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Date of Birth*
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

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
                    className="mr-1"
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
                    className="mr-1"
                  />
                  <span className="text-white text-sm">Female</span>
                </label>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Country*
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                State*
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                City*
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {formData.state && citiesByState[formData.state]?.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Pincode*
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Address*
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-1.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-white text-sm font-medium">
                Occupation*
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
              >
                <option value="">Select Occupation</option>
                {occupations.map(occupation => (
                  <option key={occupation} value={occupation}>{occupation}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between px-16 mb-4">
            <button className="px-4 py-1.5 bg-[#2F4F2F] text-white text-sm rounded-lg hover:bg-[#2F4F2F]/80 transition-colors opacity-50 cursor-not-allowed">
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-1"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-white/90 text-sm mb-4">
            Join the ultimate adventure in wilderness running
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;