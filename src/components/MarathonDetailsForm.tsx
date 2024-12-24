import React from 'react';
import { ChevronRight, Timer, Medal, Trophy } from 'lucide-react';
import { useRegistration } from './RegistrationContext';
import backgroundImage from '../images/Firefly.png';

const MarathonDetailsForm = () => {
  const { formData, updateFormData, setCurrentStep } = useRegistration();

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    setCurrentStep(3);
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
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="flex items-center opacity-60">
              <div className="w-6 h-6 rounded-full border border-[#2F4F2F] flex items-center justify-center text-sm">
                <span className="text-white">1</span>
              </div>
              <span className="ml-2 text-white text-sm">Personal</span>
            </div>
            <div className="w-8 h-px bg-[#2F4F2F]" />
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm">
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

          {/* Category selection */}
          <div className="px-16 mb-16">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: 'Full Marathon',
                  distance: '42.2 KM',
                  time: '6 Hours',
                  price: '₹2000',
                  description: 'Professional endurance race through challenging jungle terrain',
                  terrain: 'Advanced Trail'
                },
                {
                  name: 'Half Marathon',
                  distance: '21.1 KM',
                  time: '4 Hours',
                  price: '₹1500',
                  description: 'Intermediate distance with scenic jungle routes',
                  terrain: 'Moderate Trail'
                },
                {
                  name: 'Fun Run',
                  distance: '10 KM',
                  time: '2 Hours',
                  price: '₹1000',
                  description: 'Perfect for beginners and casual runners',
                  terrain: 'Easy Trail'
                },
                {
                  name: 'Trail Adventure',
                  distance: '5 KM',
                  time: '1 Hour',
                  price: '₹800',
                  description: 'Family-friendly jungle adventure run',
                  terrain: 'Basic Trail'
                }
              ].map((category) => (
                <label key={category.name} className="relative flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.name}
                    checked={formData.category === category.name}
                    onChange={(e) => updateFormData({ category: e.target.value })}
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-full bg-[#1A1A1A]/60 rounded-lg p-4 cursor-pointer hover:bg-[#1A1A1A]/80 border border-transparent hover:border-[#4CAF50]/50 transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium mb-1">{category.name}</h3>
                        <p className="text-gray-300 text-sm mb-2">{category.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center text-sm text-gray-300">
                            <Timer className="w-4 h-4 mr-1 text-[#4CAF50]" />
                            {category.time}
                          </span>
                          <span className="flex items-center text-sm text-gray-300">
                            <Trophy className="w-4 h-4 mr-1 text-[#4CAF50]" />
                            {category.distance}
                          </span>
                          <span className="flex items-center text-sm text-gray-300">
                            <Medal className="w-4 h-4 mr-1 text-[#4CAF50]" />
                            {category.terrain}
                          </span>
                        </div>
                      </div>
                      <div className="text-white font-medium">{category.price}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between px-16 mb-6">
            <button
              onClick={handleBack}
              className="px-4 py-1.5 bg-[#2F4F2F] text-white text-sm rounded-lg hover:bg-[#2F4F2F]/80 transition-colors"
            >
              Back
            </button>
            <div className="text-center text-white/90 text-sm">
              Join the ultimate adventure in wilderness running
            </div>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-1"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetailsForm;