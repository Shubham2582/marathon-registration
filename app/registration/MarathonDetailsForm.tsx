import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface MarathonDetailsFormProps {
  formData: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  nextStep: () => void
  prevStep: () => void
}

const MarathonDetailsForm: React.FC<MarathonDetailsFormProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Marathon Details
          </h1>
          <p className="text-gray-400 mt-2">Tell us about your race preferences</p>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Race Category<span className="text-purple-500">*</span></label>
              <select
                name="raceCategory"
                value={formData.raceCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
              >
                <option value="">Select category</option>
                <option value="5k">5K</option>
                <option value="10k">10K</option>
                <option value="halfMarathon">Half Marathon</option>
                <option value="fullMarathon">Full Marathon</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">T-Shirt Size<span className="text-purple-500">*</span></label>
              <select
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
              >
                <option value="">Select size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">X-Large</option>
                <option value="XXL">XX-Large</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Emergency Contact Name<span className="text-purple-500">*</span></label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                placeholder="Enter emergency contact name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Emergency Contact Number<span className="text-purple-500">*</span></label>
              <input
                type="tel"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                placeholder="Enter emergency contact number"
              />
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center space-x-2 px-8 py-3 bg-gray-700 rounded-xl text-white font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-500/20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <span>Continue</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default MarathonDetailsForm

