import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

console.log(
    "SUPABASE URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
    "SERVICE KEY:",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10)
);

export async function deleteRSVPToEvent(
    userId: string,
    eventId: string
) {
    const { error } = await supabase
        .from("user_rsvpd_events")
        .delete()
        .eq("user_id", userId)
        .eq("event_id", eventId);


    return { error };

}