import { createClient } from "@supabase/supabase-js";
import { ClubDetailsResponseClub } from "@/types/apiResponses";
import type { Database } from "@/types/supabase";

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getClub(clubId: string) {
    const { data, error } = await supabase
        .from("clubs")
        .select(`
      *,
      club_categories(
        category:categories(*)
      )
    `)
        .eq("id", clubId)
        .single();

    if (error) {
        console.error(error);
        return [];
    }

    const club: ClubDetailsResponseClub = {
        id: data.id,
        name: data.name,
        banner: data.banner_url,
        logo: data.logo_url,
        members: data.members,

        categories: data.club_categories.map(cc => ({
            id: cc.category.id,
            name: cc.category.name,
        })),

        description: data.description,
        mission: data.mission,
        meetingTime: data.meeting_time,
        location: data.location!,
        email: data.email,
        instagram: data.instagram!,
    }

    console.log(JSON.stringify(club, null, 2));

    return club


}

getClub("292c63d1-75fd-4a47-8aa4-24bfc7bfe509"); 