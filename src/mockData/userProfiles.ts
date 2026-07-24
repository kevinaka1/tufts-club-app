import { UserProfileType } from "@/types/userProfile";
export const mockUsers: UserProfileType[] = [
    {
        id: "u1",
        firstName: "Jordan",
        lastName: "Mitchell",
        email: "jordan.mitchell@tufts.edu",
        graduationYear: 2026,
        followedClubs: ["1", "4", "5"],
        rsvpdEvents: ["e8"],
        likedCategories: [
            "c4", // Engineering
            "c1", // Academic
            "c5", // Professional
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
            "c1", // Academic
            "c2", // Arts
            "c3", // Cultural
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
            "c4", // Engineering
            "c1", // Academic
            "c9", // Gaming
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
            "c2", // Arts
            "c5", // Professional
            "c10", // Wellness
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
            "c5", // Professional
            "c6", // Recreation
            "c7", // Sports
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
            "c1", // Academic
            "c4", // Engineering
            "c8", // Environmental
        ],
        interestedFormingClubs: ["f5", "f1"], // Gardening + Quantum
    },
];