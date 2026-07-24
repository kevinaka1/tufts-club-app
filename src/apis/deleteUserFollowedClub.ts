import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function deleteUserFollowedClub(
    userId: string,
    clubId: string
) {
    const { error } = await supabase
        .from("user_followed_clubs")
        .delete()
        .eq("user_id", userId)
        .eq("club_id", clubId);

    return { error };

}