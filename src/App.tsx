import { RegistrationProvider } from './components/RegistrationContext';
import PersonalInformationForm from './components/PersonalInformationForm';
import MarathonDetailsForm from './components/MarathonDetailsForm';
import PaymentForm from './components/PaymentForm/PaymentForm';
import { useRegistration } from './components/RegistrationContext';

const RegistrationFlow = () => {
  const { currentStep } = useRegistration();

  return (
    <>
      {currentStep === 1 && <PersonalInformationForm />}
      {currentStep === 2 && <MarathonDetailsForm />}
      {currentStep === 3 && <PaymentForm />}
    </>
  );
};

function App() {
  return (
    <RegistrationProvider>
      <RegistrationFlow />
    </RegistrationProvider>
  );
}

export default App;