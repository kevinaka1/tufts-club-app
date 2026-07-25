import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { CampusEvent } from "@/types/apiResponses";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const currentDate = new Date();

export async function getUpcomingCampusEvents() {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("type", "campus")
        .gte("start_date", currentDate.toISOString());

    if (error) {
        console.error(error);
        return [];
    }

    const upcomingCampusEvents: CampusEvent[] = data.map(campusEvent => ({
        id: campusEvent.id,
        name: campusEvent.name,
        description: campusEvent.description,
        location: campusEvent.location,
        startDate: new Date(campusEvent.start_date),
        endDate: new Date(campusEvent.end_date),
        organizer: campusEvent.organizer!,
        rsvpDeadline: new Date(campusEvent.rsvp_deadline!),
        image: campusEvent.image_url
    }))

    console.log(JSON.stringify(upcomingCampusEvents, null, 2));

    return upcomingCampusEvents ? upcomingCampusEvents : [];

}