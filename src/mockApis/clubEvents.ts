// mockApis/events/clubEvents.ts
import { allEvents } from "@/mockData/events";
import { allClubs } from "@/mockData/clubs";
import { mockUsers } from "@/mockData/userProfiles";
import { ClubEvent } from "@/types/apiResponses";

export function getClubEventsApiResponse(userId = "u1") {
    const user = mockUsers.find(u => u.id === userId)!;

    const events = allEvents.filter(
        (e) =>
            e.type === "club" &&
            e.clubId &&
            user.followedClubs.includes(e.clubId)
    );

    const normalized: ClubEvent[] = events.map((event) => {
        const club = allClubs.find(c => c.id === event.clubId);

        return {
            id: event.id,
            name: event.name,
            description: event.description,
            location: event.location,
            startDate: event.startDate,
            endDate: event.endDate,
            image: event.image,
            club: club
                ? { id: club.id, name: club.name }
                : null,
        };
    });

    return normalized;
}