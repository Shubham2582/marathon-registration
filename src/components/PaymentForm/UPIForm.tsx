import React from 'react';
import { QrCode } from 'lucide-react';

interface UPIFormProps {
  upiData: {
    upiId: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UPIForm = ({ upiData, onChange }: UPIFormProps) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <label className="block text-white text-sm">UPI ID</label>
        <div className="relative">
          <input
            type="text"
            name="upiId"
            value={upiData.upiId}
            onChange={onChange}
            placeholder="username@upi"
            className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 pl-10 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
          />
          <QrCode className="absolute left-3 top-2.5 h-5 w-5 text-[#4CAF50]" />
        </div>
      </div>
      <p className="text-sm text-gray-300">
        Enter your UPI ID to make the payment directly from your bank account.
      </p>
    </div>
  );
};

export default UPIForm;