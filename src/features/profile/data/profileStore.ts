import { create } from 'zustand';
import { ref, set } from 'firebase/database';
import { database, auth } from '../../../firebase/firebaseConfig';

interface ProfileState {
    step: number;
    profileData: {
      firstName: string;
      lastName: string;
      gender: string;
      dob: string;
      religion: string;
      city: string;
      state: string;
      country: string;
      livesWithFamily?: string;
      familyCity?: string;
      maritalStatus?: string;
      diet?: string;
      height?: string;
      subCommunity?: string;
      partnerCommunityPreference?: boolean;
      mobileNumber?: string;
      highestQualification?: string;
      collegeName?: string;
      workSector?: string;
      jobRole?: string;
      companyName?: string;
      incomeType?: "Yearly" | "Monthly";
      yearlyIncome?: string;
      monthlyIncome?: string;
    };
    setProfileData: (data: Partial<ProfileState['profileData']>) => void;
    nextStep: () => void;
    prevStep: () => void;
    saveToFirebase: () => Promise<void>;
  }

export const useProfileStore = create<ProfileState>((storeSet) => ({
  step: 1,
  profileData: {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    religion: '',
    city: '',
    state: '',
    country: '',
  },
  setProfileData: (data) => storeSet((state) => ({
    profileData: { ...state.profileData, ...data },
  })),
  nextStep: () => storeSet((state) => ({ step: state.step + 1 })),
  prevStep: () => storeSet((state) => ({ step: state.step - 1 })),
  saveToFirebase: async () => {
    const user = auth.currentUser;
    console.log('Saving to Firebase:', user);
    if (user) {
      const userRef = ref(database, `profile/${user.uid}`);
      const profileData = useProfileStore.getState().profileData;
      await set(userRef, { ...profileData, uid: user.uid, email: user.email });
    }
  },
}));