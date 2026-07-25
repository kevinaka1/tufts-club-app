import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getRSVPdEventIds(userId: string) {
    const { data, error } = await supabase
        .from("user_rsvpd_events")
        .select("event_id")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    const rsvpdEventIds: string[] = data.map(rsvpdEventId => rsvpdEventId.event_id)

    console.log(rsvpdEventIds);

    return rsvpdEventIds ? rsvpdEventIds : [];

}