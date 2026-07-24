import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { ClubDetailsEvent } from "@/types/apiResponses";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getClubEvents(clubId: string) {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("club_id", clubId);

    if (error) {
        console.error(error);
        return [];
    }

    const clubEvents: ClubDetailsEvent[] = data.map(clubEvent => ({
        id: clubEvent.id,
        name: clubEvent.name,
        location: clubEvent.location,
        startDate: new Date(clubEvent.start_date),
        endDate: new Date(clubEvent.end_date),
    }))

    return clubEvents ? clubEvents : [];

}
