import React from 'react';
import { useRegistration } from '../RegistrationContext';

const OrderSummary = () => {
  const { formData } = useRegistration();
  
  const getPrice = (category: string) => {
    const prices: Record<string, { price: number, distance: string }> = {
      'Full Marathon': { price: 2000, distance: '42.2 KM' },
      'Half Marathon': { price: 1500, distance: '21.1 KM' },
      'Fun Run': { price: 1000, distance: '10 KM' },
      'Trail Adventure': { price: 800, distance: '5 KM' }
    };
    return prices[category] || { price: 0, distance: '' };
  };

  const { price, distance } = getPrice(formData.category);
  const serviceFee = Math.round(price * 0.1); // 10% service fee
  const total = price + serviceFee;

  return (
    <div className="bg-[#1A1A1A]/60 rounded-lg p-6">
      <h3 className="text-white font-medium mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Marathon Category</span>
          <span className="text-white">{formData.category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Distance</span>
          <span className="text-white">{distance}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Registration Fee</span>
          <span className="text-white">₹{price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">Service Fee</span>
          <span className="text-white">₹{serviceFee}</span>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex justify-between">
          <span className="text-white font-medium">Total Amount</span>
          <span className="text-white font-medium">₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;