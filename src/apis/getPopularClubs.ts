import { createClient } from "@supabase/supabase-js";
import { ExploreClub } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


export async function getPopularClubs() {
    const { data, error } = await supabase
        .from("clubs")
        .select(`
            id, 
            name, 
            image_url, 
            members, 
            club_categories(
                category:categories(id, name)
            )
            `)
        .order("members", { ascending: false })
        .limit(5);

    if (error) {
        console.error(error);
        return [];
    }

    const popularClubs: ExploreClub[] = data.map(club => ({
        id: club.id,
        name: club.name,
        image: club.image_url,
        members: club.members,
        categories: club.club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        }))
    }))

    console.log(JSON.stringify(popularClubs, null, 2));

    return popularClubs

}