import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserInterestedFormingClubIds(userId: string) {
    const { data, error } = await supabase
        .from("user_interested_forming_clubs")
        .select("forming_club_id")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    const formingClubIds: string[] = data.map(formingClubId => formingClubId.forming_club_id)

    console.log(formingClubIds);

    return formingClubIds ? formingClubIds : [];

}