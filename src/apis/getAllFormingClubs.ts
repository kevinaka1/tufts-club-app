import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { ClubsDirectoryClub, FormingClubResponse } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllFormingClubs() {
    const { data, error } = await supabase
        .from("forming_clubs")
        .select(`
            id, 
            name, 
            description, 
            forming_club_categories(
                category:categories(
                    id,
                    name
                )
            )
            `);

    if (error) {
        console.error(error);
        return [];
    }

    const clubs: FormingClubResponse[] = data.map(club => ({
        id: club.id,
        name: club.name,
        description: club.description,

        categories: club.forming_club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        }))
    }))

    console.log(JSON.stringify(clubs, null, 2));

    return clubs

}

getAllFormingClubs();