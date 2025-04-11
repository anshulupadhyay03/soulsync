import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase/firebaseConfig';
import { UserProfile } from '../types';

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    const profilesRef = ref(database, 'profile');
    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const profileList = Object.values(data) as UserProfile[];
        setProfiles(profileList);
      }
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Profiles</h2>
      <div className="grid gap-4">
        {profiles.map((profile) => (
          <div key={profile.uid} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Career:</strong> {profile.career}</p>
            <p><strong>Family:</strong> {profile.familyDetails}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;