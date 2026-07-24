import { Suspense } from "react";
import EventsPage from "./EventsPage";
import { getEventsApiResponse } from "@/mockApis/events";
import { getRSVPdEventIds } from "@/apis/getRSVPdEventIds";
import { getUserClubsEvents } from "@/apis/getUserClubsEvents";
import { getUpcomingCampusEvents } from "@/apis/getUpcomingCampusEvents";
import { buildSections } from "@/utils/buildSections";

export default async function Page() {


    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744"
    const initialRSVPdEventIds = await getRSVPdEventIds(userId);
    console.log(`Inital RSVPd Event Ids ${initialRSVPdEventIds} `)
    const clubEvents = await getUserClubsEvents(userId);
    const campusEvents = await getUpcomingCampusEvents();

    const clubEventsSections = buildSections(clubEvents)
    const campusEventsSections = buildSections(campusEvents)



    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsPage userId={userId} initialRSVPdEventIds={initialRSVPdEventIds}
                clubEvents={clubEventsSections} campusEvents={campusEventsSections} />
        </Suspense>
    );
}