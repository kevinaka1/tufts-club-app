import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";



const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserClubsEvents(userId: string) {
    const { data, error } = await supabase
        .from("user_followed_clubs")
        .select(`
            club:clubs(
                id,
                name,
                events(
                    id,
                    name,
                    description,
                    location,
                    start_date,
                    end_date,
                    image_url,
                    type
                )
            )
        `)
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    const events = data
        .flatMap(({ club }) =>
            club.events
                .filter(event => event.type === "club")
                .map(event => ({
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    location: event.location,
                    startDate: new Date(event.start_date),
                    endDate: new Date(event.end_date),
                    image: event.image_url,
                    club: {
                        id: club.id,
                        name: club.name,
                    },
                }))
        );

    console.log(JSON.stringify(events, null, 2));

    return events ? events : [];



}