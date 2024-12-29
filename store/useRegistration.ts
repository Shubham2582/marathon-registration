import { RegistrationForm } from "@/types/form";
import { create } from "zustand";

const defaultFormState: RegistrationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "MALE",
  dateOfBirth: null,
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
  upiId: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  raceCategory: "",
  tShirtSize: "",
  emergencyContactNumber: "",
  emergencyContactName: "",
};

type RegistrationStore = {
  form: RegistrationForm;
  setForm: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  resetForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  form: defaultFormState,
  setForm: (field: string, value: string | number | Date | null) =>
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
