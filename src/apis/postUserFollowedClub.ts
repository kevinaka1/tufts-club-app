import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function postUserFollowedClub(
    userId: string,
    clubId: string
) {
    const { error } = await supabase
        .from("user_followed_clubs")
        .upsert(
            {
                user_id: userId,
                club_id: clubId,
            },
            {
                onConflict: "user_id,club_id",
            }
        );

    return { error };

}