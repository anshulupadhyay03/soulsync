import React from "react";
import { MultiStepForm } from "@/features/profile/profile-form/MultiStepForm";
import ParentLayout from "./layout";

function ProfileForm({ onProfileCreated }: { onProfileCreated: () => void }) {
  return (
    <ParentLayout>
      <h2 className="text-2xl font-bold py-5 text-center">Let's create your profile</h2>
      <MultiStepForm onProfileCreated={onProfileCreated} />
    </ParentLayout>
  );
}

export default ProfileForm;