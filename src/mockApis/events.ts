import { buildSections } from "../utils/buildSections";
import { getCampusEventsApiResponse } from "./campusEvents";
import { getClubEventsApiResponse } from "./clubEvents";
import { mockUsers } from "../mockData/userProfiles";
import { EventsApiResponse } from "@/types/apiResponses";

export function getEventsApiResponse(userId = "u1") : EventsApiResponse {
    const campusEvents = getCampusEventsApiResponse();
    const clubEvents = getClubEventsApiResponse(userId);

    return {
        initialRSVPdEventIds: mockUsers.find(u => u.id === userId)?.rsvpdEvents,
        campusEvents: buildSections(campusEvents),
        clubEvents: buildSections(clubEvents),
    };
}