import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import Auth from './components/Auth';
import ProfileForm from './components/profileForm';
import ProfileList from './features/profile_list/profileList';
import { ref, get } from 'firebase/database';
import { database } from './firebase/firebaseConfig';
import ParentLayout from './components/layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              profileCreated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/create-profile" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* Profile Creation Page */}
        <Route
          path="/create-profile"
          element={
            isAuthenticated && !profileCreated ? (
              <ProfileForm
                onProfileCreated={() => {
                  setProfileCreated(true);
                  console.log('Profile created successfully');
                }}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated && profileCreated ? (
              <ParentLayout>
                <ProfileList />
              </ParentLayout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;