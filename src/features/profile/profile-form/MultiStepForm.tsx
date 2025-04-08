import { useProfileStore } from "../data/profileStore";
import { Step1 } from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";

export function MultiStepForm() {
  const { step } = useProfileStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create Your Profile - Step {step}</h2>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>
    </div>
  );
}