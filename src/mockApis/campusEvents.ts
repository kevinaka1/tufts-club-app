// mockApis/events/campusEvents.ts
import { allEvents } from "@/mockData/events";
import { CampusEvent } from "@/types/apiResponses";



export function getCampusEventsApiResponse() {
    const events = allEvents.filter(
        (e) => e.type === "campus"
    );

    const normalized: CampusEvent[] = events.map((event) => ({
        id: event.id,
        name: event.name,
        description: event.description,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        image: event.image,
        rsvpDeadline: event.rsvpDeadline,
        organizer: event.organizer,
    }));

    console.log(normalized)

    return normalized;
}