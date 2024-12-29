import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRegistrationStore } from "@/store/useRegistration";
import { RenderField } from "@/components/render-field";

interface PaymentFormProps {
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ prevStep, handleSubmit }) => {
  const { form: formData, handleChange } = useRegistrationStore();

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="space-y-2">
        <label className="text-white font-bold">
          Payment Method / भुगतान का तरीका<span className="text-green-500">*</span>
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={formData.paymentMethod === "UPI"}
              onChange={handleChange}
              className="form-radio text-purple-500 focus:ring-purple-500/20"
              required
            />
            <span className="text-gray-300">UPI / यूपीआई</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="CARD"
              checked={formData.paymentMethod === "CARD"}
              onChange={handleChange}
              className="form-radio text-purple-500 focus:ring-purple-500/20"
              required
            />
            <span className="text-gray-300">Card / कार्ड</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="NETBANKING"
              checked={formData.paymentMethod === "NETBANKING"}
              onChange={handleChange}
              className="form-radio text-purple-500 focus:ring-purple-500/20"
              required
            />
            <span className="text-gray-300">Net Banking / नेट बैंकिंग</span>
          </label>
        </div>
      </div>

      {formData.paymentMethod === "CARD" && (
        <>
          <RenderField label="Card Number / कार्ड नंबर" name="cardNumber" placeholder="1234 5678 9012 3456" />

          <RenderField label="Cardholder Name / कार्डधारक का नाम" name="cardName" placeholder="John Doe" />

          <div className="grid grid-cols-2 gap-4">
            <RenderField label="Expiry Date / समाप्ति तिथि" name="expiryDate" type="date" placeholder="MM/YY" />
            <RenderField label="CVV / सीवीवी" name="cvv" placeholder="123" />
          </div>
        </>
      )}

      {formData.paymentMethod === "UPI" && <RenderField label="UPI ID / यूपीआई आईडी" name="upiId" placeholder="yourname@upi" />}

      {formData.paymentMethod === "NETBANKING" && (
        <>
          <RenderField label="Bank Name / बैंक का नाम" name="bankName" placeholder="Enter bank name" />
          <RenderField label="Account Number / खाता संख्या" name="accountNumber" placeholder="Enter account number" />
          <RenderField label="IFSC Code / आईएफएससी कोड" name="ifscCode" placeholder="Enter IFSC Code" />
        </>
      )}

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 h-fit bg-gray-700 text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="submit"
          className="px-6 py-2 h-fit bg-[#4CAF50] text-white text-sm rounded-lg hover:bg-[#45A049] transition-colors flex items-center gap-2"
        >
          Complete Registration / पंजीकरण पूरा करें
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
