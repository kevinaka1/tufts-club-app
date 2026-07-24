export type UserProfileType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: number;
    followedClubs: string[]; // club ids
    rsvpdEvents: string[]; // campus event ids only
    likedCategories: string[];
    interestedFormingClubs: string[]; // forming club ids
};