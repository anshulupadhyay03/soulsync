import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { Button } from "@/components/ui/button";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen w-screen flex"
    >
      <ResizablePanel defaultSize={70}>
        <div
          className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
          style={{
            backgroundImage: `url('/images/login/marriage1.jpg')`, // Background image URL
            height: "100vh", // Ensure full height
          }}
        >
            <div className="absolute top-0 w-full text-center mt-8">
            <h1 className="text-5xl font-bold mb-4 text-white">Soul Sync</h1>
            <p className="text-lg px-8 text-white mb-4">
              Soul Sync makes partner search easy with the help of our elders and
              people who you trust.
            </p>
            </div>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={30}>
        <div className="w-10/12 max-w-md p-6 bg-white rounded-lg shadow-md h-full flex flex-col justify-center items-center mx-auto m-4">
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Auth;