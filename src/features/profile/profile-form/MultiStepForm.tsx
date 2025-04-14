import { useProfileStore } from "../data/profileStore";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";

export function MultiStepForm({ onProfileCreated }: { onProfileCreated: () => void }) {
  const { step } = useProfileStore();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 m-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-500">Step {step}</h2>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 onProfileCreated={onProfileCreated} />}
      </div>
    </div>
  );
}