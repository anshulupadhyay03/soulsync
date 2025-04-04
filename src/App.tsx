import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import Auth from './components/Auth';
import ProfileForm from './components/profileForm';
import ProfileList from './components/profileList';
import { ref, get } from 'firebase/database';
import { database } from './firebase/firebaseConfig';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        const userRef = ref(database, `users/${user.uid}`);
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
    <div className="min-h-screen bg-gray-50">
      {!isAuthenticated ? (
        <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : !profileCreated ? (
        <ProfileForm onProfileCreated={() => setProfileCreated(true)} />
      ) : (
        <ProfileList />
      )}
    </div>
  );
};

export default App;