import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { UserProfile } from '../profile_list/UserProfile';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Users, Star, ChevronLeft, ChevronRight, Crown } from 'lucide-react';

const ProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const profilesRef = ref(database, 'profile/');
    onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const profileList = Object.values(data) as UserProfile[];
        setProfiles(profileList);
        const initialImageIndex = profileList.reduce((acc, profile) => {
          acc[profile.uid] = 0;
          return acc;
        }, {} as { [key: string]: number });
        setCurrentImageIndex(initialImageIndex);
      }
    });
  }, []);

  const handleImageNavigation = (profileId: string, direction: 'prev' | 'next') => {
    setCurrentImageIndex((prev) => {
      const totalImages = 2;
      let newIndex = prev[profileId] || 0;
      if (direction === 'prev') {
        newIndex = newIndex > 0 ? newIndex - 1 : totalImages - 1;
      } else {
        newIndex = newIndex < totalImages - 1 ? newIndex + 1 : 0;
      }
      return { ...prev, [profileId]: newIndex };
    });
  };

  // Calculate age from DOB
  const calculateAge = (dob: string): number => {
    if (!dob) return 0; // Default to 0 if DOB is missing
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : 0; // Prevent negative age
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      {/* {profiles.map((profile) => (
       
      ))} */}
      {Array.from({ length: 5 }).map((_, i) => {
        if (profiles.length === 0) {
          return null; // Render nothing if profiles array is empty
        }
        const profile = profiles[0];
        return (
          <div
          key={profile.uid}
          className="grid grid-cols-[230px_1fr_200px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {/* Profile Image with Navigation */}
          <div className="relative rounded-l-lg overflow-hidden">
            <img
              src={"https://i.pravatar.cc/230"}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-[210px] h-[230px] object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              {currentImageIndex[profile.uid] + 1} of 2
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={() => handleImageNavigation(profile.uid, 'prev')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-6 top-1/2 transform -translate-y-1/2"
              onClick={() => handleImageNavigation(profile.uid, 'next')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Profile Details */}
          <div className="p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                {profile.firstName} {profile.lastName}
              </span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Users className="h-4 w-4 mr-1" /> You & Her
                </Button>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4 mr-1" /> Astro
                </Button>
              </div>
            </div>
            <div className="border-b border-gray-400 my-2"></div>
            <div className="flex justify-between">
              <div>
                <p>
                  {calculateAge(profile.dob)} yrs, {profile.height || "5ft 7in - 170cm"}
                </p>
                <p>
                  {profile.religion || "Hindu"}, {profile.subCommunity || "Brahmin - Sanadya"}
                </p>
                <p>{profile.language || "Hindi"}</p>
              </div>
              <div className="text-right">
                <p>{profile.city || "City1"}, {profile.state || "State1"}</p>
                <p>{profile.jobRole || "Software Developer / Programmer"}</p>
                <p>
                  {profile.maritalStatus || "Divorced"}{" "}
                  {profile.maritalStatus === "Divorced" ? "(Children: No)" : ""}
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              {profile.bio || "Hello, and welcome to my Son's profile. He is an independent and outgoing individual. He ..."}
              <span className="text-blue-500 cursor-pointer">More</span>
            </p>
          </div>

          {/* Connect Button */}
          <div className="flex flex-col items-center justify-center border-l border-gray-300 p-4">
            <span className="text-gray-500 mb-2">Like this profile?</span>
            <Button className="bg-gradient-to-r from-green-400 to-cyan-500 text-white hover:from-green-500 hover:to-cyan-600">
              <Check className="h-4 w-4 mr-2" /> Connect Now
            </Button>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default ProfileList;