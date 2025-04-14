import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import Auth from './components/Auth';
import ProfileForm from './components/profileForm';
import ProfileList from './components/profileList';
import { ref, get } from 'firebase/database';
import { database } from './firebase/firebaseConfig';
import ParentLayout from './components/layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userRef = ref(database, `profile/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setProfileCreated(true);
        }
      } else {
        setIsAuthenticated(false);
        setProfileCreated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    !isAuthenticated ? (
      <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
    ) : !profileCreated ? (
      <ProfileForm onProfileCreated={() => {
        setProfileCreated(true);
        console.log("Profile created successfully");
      }} />
    ) : (
      <ParentLayout>
        <ProfileList />
      </ParentLayout>
    )
  );
};

export default App;