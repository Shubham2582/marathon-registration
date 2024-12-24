import React from 'react';
import { Building2 } from 'lucide-react';

interface Bank {
  id: string;
  name: string;
}

const popularBanks: Bank[] = [
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' }
];

interface NetBankingFormProps {
  selectedBank: string;
  onBankSelect: (bankId: string) => void;
}

const NetBankingForm = ({ selectedBank, onBankSelect }: NetBankingFormProps) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-4">
        <h4 className="text-white text-sm font-medium">Popular Banks</h4>
        <div className="grid grid-cols-1 gap-3">
          {popularBanks.map((bank) => (
            <label key={bank.id} className="relative flex items-center">
              <input
                type="radio"
                name="bank"
                value={bank.id}
                checked={selectedBank === bank.id}
                onChange={(e) => onBankSelect(e.target.value)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
              <div className="w-full bg-[#1A1A1A]/60 rounded-lg p-3 cursor-pointer hover:bg-[#1A1A1A]/80 border border-transparent hover:border-[#4CAF50]/50 transition-all flex items-center">
                <Building2 className="w-5 h-5 text-[#4CAF50] mr-3" />
                <span className="text-white text-sm">{bank.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-white text-sm">Other Banks</label>
        <select 
          className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
          onChange={(e) => onBankSelect(e.target.value)}
          value={selectedBank}
        >
          <option value="">Select Bank</option>
          <option value="pnb">Punjab National Bank</option>
          <option value="bob">Bank of Baroda</option>
          <option value="canara">Canara Bank</option>
          <option value="union">Union Bank</option>
        </select>
      </div>
    </div>
  );
};

export default NetBankingForm;