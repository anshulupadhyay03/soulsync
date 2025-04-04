import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { Button } from "@/components/ui/button";

const Auth: React.FC<{ onAuthSuccess: () => void }> = ({ onAuthSuccess }) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthSuccess();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex h-screen flex-row">
      {/* Left Side */}
      <div
        className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: `url('/images/login/marriage1.jpg')`, // Background image URL
        }}
      >
        <h1 className="text-5xl font-bold mb-4">Soul Sync</h1>
        <p className="text-lg text-center px-8">
          Soul Sync makes partner search easy with the help of our elders and
          people who you trust.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-5/12 flex flex-col justify-center items-center bg-gray-100">
        <div className="w-10/12 max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome to Soul Sync
          </h2>
          <Button
            onClick={signInWithGoogle}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;