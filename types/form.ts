import { BloodGroup } from "@/src/data/bloodGroups";

export interface RegistrationForm {
  // --- PERSONEL INFORMATION ---
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
  country: string;
  pincode: string;
  state: string;
  city: string;
  occupation: string;
  bloodGroup: BloodGroup | "";
  selfie: File | null;

  paymentMethod: "UPI" | "NETBANKING" | "CARD";

  // --- CARD PAYMENT ---
  cardNumber: string;
  cardName: string;
  expiryDate: Date | null;
  cvv: number | null;

  // --- OTP VERIFICATION ---
  otp?: string;

  // --- MARATHON DETAILS ---
  raceCategory: string;
  tShirtSize: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
}
