import React from 'react';

interface CardFormProps {
  cardData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardForm = ({ cardData, onChange }: CardFormProps) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-2">
        <label className="block text-white text-sm">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={onChange}
          placeholder="XXXX XXXX XXXX XXXX"
          className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-white text-sm">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={cardData.expiryDate}
            onChange={onChange}
            placeholder="MM/YY"
            className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-white text-sm">CVV</label>
          <input
            type="text"
            name="cvv"
            value={cardData.cvv}
            onChange={onChange}
            placeholder="XXX"
            className="w-full bg-[#1A1A1A]/60 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#4CAF50]"
          />
        </div>
      </div>
    </div>
  );
};

export default CardForm;