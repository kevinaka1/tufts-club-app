import { CategoryType } from "./category";

export type CategoryResponse = {
    id: string;
    name: string;
};

export type FollowedClubResponse = {
    id: string;
    name: string;
    image: string;
    members: number;
    categories: CategoryResponse[];
};

export type UserProfileResponse = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: number;
};

export type UserProfileApiResponse = {
    user: UserProfileResponse;
    userLikedCategories: CategoryResponse[];
    userFollowedClubs: FollowedClubResponse[];
};

export type FormingClubResponse = {
    id: string;
    name: string;
    description: string;
    categories: CategoryResponse[];
};

export type FormingClubsApiResponse = {
    formingClubs: FormingClubResponse[];
    initialInterestedClubIds: string[] | undefined;
};

export type ExploreClub = {
    id: string;
    name: string;
    image?: string;
    members: number;
    categories: CategoryType[];
};

export type ExploreCampusEvent = {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    organizer: string;
    image: string;
};

export type ExploreApiResponse = {
    newClubs: ExploreClub[];
    popularClubs: ExploreClub[];
    upcomingCampusEvents: ExploreCampusEvent[];
    recommendedClubs: ExploreClub[];
    randomCategory: CategoryType | null;
};

export type ClubEvent = {
    id: string;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    image: string;
    club: {
        id: string;
        name: string;
    } | null;
};

export type CampusEvent = {
    id: string;
    name: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    image: string;
    rsvpDeadline?: Date;
    organizer?: string;
};

export type CampusEventSections = {
    todayEvents: CampusEvent[],
    thisWeekEvents: CampusEvent[],
    laterEvents: CampusEvent[]
};

export type ClubEventSections = {
    todayEvents: ClubEvent[],
    thisWeekEvents: ClubEvent[],
    laterEvents: ClubEvent[]
}


export type EventsApiResponse = {
    initialRSVPdEventIds: string[] | undefined,
    campusEvents: CampusEventSections,
    clubEvents: ClubEventSections
}

export type ClubsDirectoryClub = {
    id: string;
    name: string;
    description: string;
    image: string;
    members: number;
    categories: CategoryType[];
    createdAt: Date;
};

export type ClubsDirectoryApiResponse = {
    allClubsNormalized: ClubsDirectoryClub[];
    usersLikedCategories: CategoryType[];
    categories: CategoryType[];
}

export type ClubDetailsResponseClub = {
    id: string;
    name: string;
    banner: string;
    logo: string;
    members: number;

    categories: CategoryType[];

    description: string;
    mission: string;

    meetingTime: string;
    location: string;

    email: string;
    instagram: string;
};

export type ClubDetailsEvent = {
    id: string;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
};

export type ClubDetailsSimilarClub = {
    id: string;
    name: string;
    members: number;
    categories: CategoryType[];
};

export type ClubDetailsApiResponse = {
    club: ClubDetailsResponseClub;
    upcomingEvents: ClubDetailsEvent[];
    similarClubs: ClubDetailsSimilarClub[];
} | null;