import { createClient } from "@supabase/supabase-js";
import { CategoryResponse } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getSimilarClubs(clubId: string) {
    const { data: clubs, error } = await supabase
        .from("clubs")
        .select(`
      *,
      club_categories(
        category:categories(id, name)
      )
    `);

    if (error) {
        console.error(error);
        return;
    }

    const normalizedClubs = clubs.map(club => ({
        id: club.id,
        name: club.name,
        members: club.members,
        categories: club.club_categories.map(c => c.category),
    }));

    const currentClub = normalizedClubs.find(c => c.id === clubId);
    if (!currentClub) return [];

    const currentCategories = new Set(
        currentClub.categories.map((c) => c.id)
    );

    return normalizedClubs
        .filter(c => c.id !== clubId)
        .map(c => ({
            c,
            shared: c.categories.filter(cat =>
                currentCategories.has(cat.id)
            ).length,
        }))
        .filter(x => x.shared > 0)
        .sort((a, b) => b.shared - a.shared)
        .map(x => x.c);
}