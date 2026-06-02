export type UserProfile = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: number;
    followedClubs: string[]; // club ids
    rsvpdEvents: string[]; // campus event ids only
    likedCategories: string[];
    interestedFormingClubs?: string[]; // forming club ids
};

export const mockUsers: UserProfile[] = [
    {
        id: "u1",
        firstName: "Jordan",
        lastName: "Mitchell",
        email: "jordan.mitchell@tufts.edu",
        graduationYear: 2026,
        followedClubs: ["1", "4", "5"],
        rsvpdEvents: ["e8"],
        likedCategories: [
            "Engineering",
            "Academic",
            "Professional",
        ],
        interestedFormingClubs: ["f1", "f3"], // Quantum + Esports
    },

    {
        id: "u2",
        firstName: "Maya",
        lastName: "Johnson",
        email: "maya.johnson@tufts.edu",
        graduationYear: 2027,
        followedClubs: ["2", "3"],
        rsvpdEvents: ["e9"],
        likedCategories: [
            "Academic",
            "Arts",
            "Cultural",
        ],
        interestedFormingClubs: ["f2", "f6"], // Fashion + Film
    },

    {
        id: "u3",
        firstName: "Daniel",
        lastName: "Kim",
        email: "daniel.kim@tufts.edu",
        graduationYear: 2026,
        followedClubs: ["1", "4", "6"],
        rsvpdEvents: ["e8", "e10"],
        likedCategories: [
            "Engineering",
            "Academic",
            "Gaming",
        ],
        interestedFormingClubs: ["f1", "f3"], // Quantum + Esports
    },

    {
        id: "u4",
        firstName: "Aisha",
        lastName: "Patel",
        email: "aisha.patel@tufts.edu",
        graduationYear: 2028,
        followedClubs: ["3", "5"],
        rsvpdEvents: ["e10"],
        likedCategories: [
            "Arts",
            "Professional",
            "Wellness",
        ],
        interestedFormingClubs: ["f4", "f6"], // Mental Health + Film
    },

    {
        id: "u5",
        firstName: "Marcus",
        lastName: "Lee",
        email: "marcus.lee@tufts.edu",
        graduationYear: 2025,
        followedClubs: ["2", "5", "6"],
        rsvpdEvents: ["e8", "e9"],
        likedCategories: [
            "Professional",
            "Recreation",
            "Sports",
        ],
        interestedFormingClubs: [], // none
    },

    {
        id: "u6",
        firstName: "Sophia",
        lastName: "Garcia",
        email: "sophia.garcia@tufts.edu",
        graduationYear: 2027,
        followedClubs: ["1", "2", "4"],
        rsvpdEvents: [],
        likedCategories: [
            "Academic",
            "Engineering",
            "Environmental",
        ],
        interestedFormingClubs: ["f5", "f1"], // Gardening + Quantum
    },
];