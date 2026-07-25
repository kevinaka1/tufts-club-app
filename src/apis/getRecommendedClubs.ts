import { createClient } from "@supabase/supabase-js";
import { ExploreClub } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getRecommendedClubs(categoryId: string | undefined) {
    if (!categoryId) {
        return;
    }
    const { data, error } = await supabase
        .from("club_categories")
        .select(`
        club:clubs(
            id,
            name,
            image_url,
            members,
            description,
            created_at,
            club_categories(
                category:categories(
                    id,
                    name
                )
            )
        )
    `)
        .eq("category_id", categoryId);

    if (error) {
        console.error(error);
        return [];
    }

    const recommendedClubs: ExploreClub[] = data.map(row => ({
        id: row.club.id,
        name: row.club.name,
        image: row.club.image_url,
        members: row.club.members,

        categories: row.club.club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        }))
    }))

    console.log(JSON.stringify(recommendedClubs, null, 2));

    return recommendedClubs


}