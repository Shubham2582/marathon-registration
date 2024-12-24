import React from 'react';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

const paymentMethods = [
  { name: 'Credit/Debit Card', icon: CreditCard },
  { name: 'UPI', icon: Smartphone },
  { name: 'Net Banking', icon: Wallet }
];

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethods = ({ selectedMethod, onMethodChange }: PaymentMethodsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-medium mb-4">Select Payment Method</h3>
      {paymentMethods.map((method) => (
        <label key={method.name} className="relative flex items-center">
          <input
            type="radio"
            name="payment"
            value={method.name}
            checked={selectedMethod === method.name}
            onChange={(e) => onMethodChange(e.target.value)}
            className="absolute opacity-0 w-full h-full cursor-pointer"
          />
          <div className="w-full bg-[#1A1A1A]/60 rounded-lg p-4 cursor-pointer hover:bg-[#1A1A1A]/80 border border-transparent hover:border-[#4CAF50]/50 transition-all flex items-center">
            <method.icon className="w-5 h-5 text-[#4CAF50] mr-3" />
            <span className="text-white text-sm">{method.name}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default PaymentMethods;