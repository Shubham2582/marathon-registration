import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { RegistrationForm } from "@/types/form";

interface PaymentFormProps {
  formData: RegistrationForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
}) => {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Payment Details
          </h1>
          <p className="text-gray-400 mt-2">Complete your registration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">
              Payment Method<span className="text-purple-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="form-radio text-purple-500 focus:ring-purple-500/20"
                  required
                />
                <span className="text-gray-300">Card</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                  className="form-radio text-purple-500 focus:ring-purple-500/20"
                  required
                />
                <span className="text-gray-300">UPI</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === "netbanking"}
                  onChange={handleChange}
                  className="form-radio text-purple-500 focus:ring-purple-500/20"
                  required
                />
                <span className="text-gray-300">Net Banking</span>
              </label>
            </div>
          </div>

          {formData.paymentMethod === "card" && (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Card Number<span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Cardholder Name<span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Expiry Date<span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={
                      formData.expiryDate ? formData.expiryDate.toString() : ""
                    }
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    CVV<span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {formData.paymentMethod === "upi" && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                UPI ID<span className="text-purple-500">*</span>
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                placeholder="yourname@upi"
                required
              />
            </div>
          )}

          {formData.paymentMethod === "netbanking" && (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Bank Name<span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="Enter bank name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  Account Number<span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  IFSC Code<span className="text-purple-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="Enter IFSC code"
                  required
                />
              </div>
            </>
          )}

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
              type="submit"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500/20 transition-all"
            >
              <span>Complete Registration</span>
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
