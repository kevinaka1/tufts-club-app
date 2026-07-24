import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { ClubDetailsEvent, FollowedClubResponse } from "@/types/apiResponses";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserFollowedClubs(userId: string) {
    const { data, error } = await supabase
        .from("user_followed_clubs")
        .select(`
            club:clubs(
                id, 
                name, 
                description, 
                image_url, 
                members, 
                created_at,
                club_categories(
                    category:categories(*)
                )
            )
        `)
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    const userFollowedClubs: FollowedClubResponse[] = data.map(row => ({
        id: row.club.id,
        name: row.club.name,
        image: row.club.image_url,
        members: row.club.members,

        categories: row.club.club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        }))
    }));

    console.log(JSON.stringify(userFollowedClubs, null, 2));

    return userFollowedClubs ? userFollowedClubs : [];



}