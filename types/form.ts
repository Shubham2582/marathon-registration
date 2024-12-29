export interface RegistrationForm {
  // --- PERSONEL INFORMATION ---
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: Date | null;
  country: string;
  pincode: string;
  state: string;
  city: string;
  occupation: string;

  paymentMethod: "UPI" | "NETBANKING" | "CARD";

  // --- CARD PAYMENT ---
  cardNumber: string;
  cardName: string;
  expiryDate: Date | null;
  cvv: number | null;

  // --- UPI PAYMENT ---
  upiId: string;

  // --- NET BANKING PAYMENT ---
  bankName: string;
  accountNumber: string;
  ifscCode: string;

  // --- MARATHON DETAILS ---
  raceCategory: string;
  tShirtSize: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
}
