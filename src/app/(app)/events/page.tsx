import { Suspense } from "react";
import EventsPage from "./EventsPage";
import { getRSVPdEventIds } from "@/apis/getRSVPdEventIds";
import { getUserClubsEvents } from "@/apis/getUserClubsEvents";
import { getUpcomingCampusEvents } from "@/apis/getUpcomingCampusEvents";
import { buildSections } from "@/utils/buildSections";
import { createClient } from "@/lib/supabase-server";

export default async function Page() {


    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user!.id

    const initialRSVPdEventIds = await getRSVPdEventIds(userId);
    console.log(`Inital RSVPd Event Ids ${initialRSVPdEventIds} `)
    const clubEvents = await getUserClubsEvents(userId);
    const campusEvents = await getUpcomingCampusEvents();

    const clubEventsSections = buildSections(clubEvents)
    const campusEventsSections = buildSections(campusEvents)



    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsPage initialRSVPdEventIds={initialRSVPdEventIds}
                clubEvents={clubEventsSections} campusEvents={campusEventsSections} />
        </Suspense>
    );
}