import React, { createContext, useContext, useState } from 'react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  pincode: string;
  state: string;
  country: string;
  city: string;
  occupation: string;
  
  // Marathon Details
  category: string;
}

interface RegistrationContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  gender: '',
  dateOfBirth: '',
  address: '',
  pincode: '',
  state: '',
  country: '',
  city: '',
  occupation: '',
  category: '',
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateFormData, currentStep, setCurrentStep }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};