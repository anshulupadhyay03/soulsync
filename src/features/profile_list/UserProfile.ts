export interface UserProfile {
    uid: string;
    name: string;
    address: string;
    career: string;
    familyDetails: string;
    email: string;
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
    bio?: string; // Added for the short description
    onlineStatus?: string; // Added for online/offline status
    imageUrl?: string; // Added for profile image
    language?: string; // Added language property
  }