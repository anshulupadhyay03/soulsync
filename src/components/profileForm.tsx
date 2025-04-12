import React from "react";
import { MultiStepForm } from "@/features/profile/profile-form/MultiStepForm";

function ProfileForm({ onProfileCreated }: { onProfileCreated: () => void }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 justify-self-center">Let's create your profile</h2>
      <MultiStepForm onProfileCreated={onProfileCreated} />
    </>
  );
}

export default ProfileForm;