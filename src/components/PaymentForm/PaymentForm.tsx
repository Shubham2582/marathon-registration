import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRegistration } from '../RegistrationContext';
import PaymentMethods from './PaymentMethods';
import CardForm from './CardForm';
import UPIForm from './UPIForm';
import NetBankingForm from './NetBankingForm';
import OrderSummary from './OrderSummary';
import backgroundImage from "../../images/Firefly.png";

const PaymentForm = () => {
  const { setCurrentStep } = useRegistration();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [upiData, setUpiData] = useState({
    upiId: ''
  });
  const [selectedBank, setSelectedBank] = useState('');

  const handleBack = () => {
    setCurrentStep(2);
  };

  const handleCardDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleUPIDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpiData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    // Handle payment logic based on selected method
    switch (selectedMethod) {
      case 'Credit/Debit Card':
        console.log('Processing card payment...', cardData);
        break;
      case 'UPI':
        console.log('Processing UPI payment...', upiData);
        break;
      case 'Net Banking':
        console.log('Processing Net Banking payment...', selectedBank);
        break;
      default:
        console.log('Please select a payment method');
    }
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
            <div className="flex items-center opacity-60">
              <div className="w-6 h-6 rounded-full border border-[#2F4F2F] flex items-center justify-center text-sm">
                <span className="text-white">2</span>
              </div>
              <span className="ml-2 text-white text-sm">Category</span>
            </div>
            <div className="w-8 h-px bg-[#2F4F2F]" />
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center text-sm">
                <span className="text-white">3</span>
              </div>
              <span className="ml-2 text-white text-sm">Payment</span>
            </div>
          </div>

          <div className="px-16 mb-16">
            <div className="grid grid-cols-2 gap-6">
              {/* Left side - Payment Methods */}
              <div>
                <PaymentMethods
                  selectedMethod={selectedMethod}
                  onMethodChange={setSelectedMethod}
                />
                {selectedMethod === 'Credit/Debit Card' && (
                  <CardForm
                    cardData={cardData}
                    onChange={handleCardDataChange}
                  />
                )}
                {selectedMethod === 'UPI' && (
                  <UPIForm
                    upiData={upiData}
                    onChange={handleUPIDataChange}
                  />
                )}
                {selectedMethod === 'Net Banking' && (
                  <NetBankingForm
                    selectedBank={selectedBank}
                    onBankSelect={setSelectedBank}
                  />
                )}
              </div>

              {/* Right side - Order Summary */}
              <OrderSummary />
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
              onClick={handlePayment}
              disabled={!selectedMethod}
              className="px-4 py-1.5 bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;