// api/clubDetails.ts

import { allClubs } from "@/mockData/clubs";
import { allEvents } from "@/mockData/events";
import { categories } from "@/mockData/categories";
import { ClubDetailsApiResponse } from "@/types/apiResponses";

const categoryMap = Object.fromEntries(
    categories.map((category) => [category.id, category])
);

export function getClubDetailsResponse(clubId: string): ClubDetailsApiResponse {
    const clubDetails = allClubs.find(
        (club) => club.id === clubId
    );

    if (!clubDetails) {
        return null;
    }

    const club = {
        id: clubDetails.id,
        name: clubDetails.name,
        banner: clubDetails.banner,
        logo: clubDetails.logo,
        members: clubDetails.members,

        categories: clubDetails.categories.map(
            (id) => categoryMap[id]
        ),

        description: clubDetails.description,
        mission: clubDetails.mission,

        meetingTime: clubDetails.meetingTime,
        location: clubDetails.location,

        email: clubDetails.email,
        instagram: clubDetails.instagram,

    }

    const upcomingEvents = allEvents
        .filter(
            (event) =>
                event.clubId === clubId &&
                event.startDate > new Date()
        )
        .sort(
            (a, b) =>
                a.startDate.getTime() -
                b.startDate.getTime()
        )
        .map((event) => ({
            id: event.id,
            name: event.name,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
        }));

    const similarClubs = allClubs
        .filter(
            (currClub) =>
                currClub.id !== clubDetails.id &&
                currClub.categories.some((category) =>
                    clubDetails.categories.includes(category)
                )
        )
        .map((similarClub) => ({
            id: similarClub.id,
            name: similarClub.name,
            members: similarClub.members,
            categories: similarClub.categories.map(
                (id) => categoryMap[id]
            ),
        }));

    return {
        club,
        upcomingEvents,
        similarClubs,
    };

}

console.log(getClubDetailsResponse("1"));
