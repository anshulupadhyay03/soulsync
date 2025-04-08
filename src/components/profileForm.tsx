import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { UserProfile } from '../types/userProfile';
import {ProfileFormData} from '../features/profile/createProfile';
import { MultiStepForm } from '@/features/profile/profile-form/MultiStepForm';

function ProfileForm({ onProfileCreated }: { onProfileCreated: () => void }) {
  return (
    <>
     <h2 className="text-2xl font-bold mb-6 justify-self-center">Let's create your profile</h2>
    <div className="max-w-md mt-5 p-8 bg-white rounded-2xl shadow-md mx-auto">
      <h1 className="text-1xl font-medium mb-6 justify-self-center">Personal Details</h1>
      <MultiStepForm/>
    </div>
    </>
    
  );
};

export default ProfileForm;