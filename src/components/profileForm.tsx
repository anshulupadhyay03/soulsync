import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { UserProfile } from '../types/userProfile';
import {ProfileFormData} from '../features/profile/createProfile';

function ProfileForm({ onProfileCreated }: { onProfileCreated: () => void }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Your Profile</h2>
      <ProfileFormData/>
    </div>
  );
};

export default ProfileForm;