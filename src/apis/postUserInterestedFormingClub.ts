import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function postUserInterestedFormingClub(
    userId: string,
    formingClubId: string
) {
    const { error } = await supabase
        .from("user_interested_forming_clubs")
        .upsert(
            {
                user_id: userId,
                forming_club_id: formingClubId,
            },
            {
                onConflict: "user_id,forming_club_id",
            }
        );

    return { error };
}