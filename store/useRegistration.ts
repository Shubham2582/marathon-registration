import { RegistrationForm } from "@/types/form";
import { create } from "zustand";

const defaultFormState: RegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "MALE",
  dateOfBirth: "",
  country: "",
  pincode: "",
  state: "",
  city: "",
  occupation: "",
  paymentMethod: "UPI",
  cardNumber: "",
  cardName: "",
  expiryDate: null,
  cvv: null,
  raceCategory: "",
  tShirtSize: "",
  emergencyContactNumber: "",
  emergencyContactName: "",
  bloodGroup: "",
  selfie: null,
  otp: "",
  isFromBastar: false,
  needsAccommodation: false,
};

interface RegistrationStore {
  form: RegistrationForm;
  isOtpVerified: boolean;
  setOtpVerified: (value: boolean) => void;
  setForm: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K] | File) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  form: defaultFormState,
  isOtpVerified: false,
  setOtpVerified: (value) => set({ isOtpVerified: value }),
  setForm: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),
  resetForm: () => set({ form: defaultFormState }),
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  },
}));
