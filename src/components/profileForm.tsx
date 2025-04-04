import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database, auth } from '../firebase/firebaseConfig';
import { UserProfile } from '../types';

const ProfileForm: React.FC<{ onProfileCreated: () => void }> = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState<UserProfile>({
    uid: auth.currentUser?.uid || '',
    name: '',
    address: '',
    career: '',
    familyDetails: '',
    email: auth.currentUser?.email || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userRef = ref(database, `users/${formData.uid}`);
    await set(userRef, formData);
    onProfileCreated();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="career"
          value={formData.career}
          onChange={handleChange}
          placeholder="Career"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          name="familyDetails"
          value={formData.familyDetails}
          onChange={handleChange}
          placeholder="Family Details"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;