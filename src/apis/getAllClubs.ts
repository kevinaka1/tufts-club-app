import { createClient } from "@supabase/supabase-js";
import { ClubsDirectoryClub } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllClubs() {
    const { data, error } = await supabase
        .from("clubs")
        .select(`
            id, 
            name, 
            description, 
            image_url, 
            members, 
            created_at,
            club_categories(
                category:categories(*)
            )
            `);

    if (error) {
        console.error(error);
        return;
    }

    const clubs: ClubsDirectoryClub[] = data.map(club => ({
        id: club.id,
        name: club.name,
        description: club.description,
        image: club.image_url,
        members: club.members,
        createdAt: new Date(club.created_at),

        categories: club.club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        }))
    }))

    console.log(JSON.stringify(clubs, null, 2));

    return clubs

}

getAllClubs();