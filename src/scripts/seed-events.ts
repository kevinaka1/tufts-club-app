import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { allEvents } from "../mockData/events";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedEvents() {
    const { data: clubs, error: clubsError } =
        await supabase
            .from("clubs")
            .select("id, mock_id");

    if (clubsError) {
        console.error(clubsError);
        return;
    }

    const clubMap = Object.fromEntries(
        clubs.map((club) => [
            club.mock_id,
            club.id,
        ])
    );

    const eventsToInsert =
        allEvents.map((event) => ({
            mock_id: event.id,
            type: event.type,
            club_id: event.clubId
                ? clubMap[event.clubId]
                : null,
            organizer:
                event.organizer ?? null,
            name: event.name,
            description:
                event.description,
            location: event.location,
            start_date:
                event.startDate.toISOString(),
            end_date:
                event.endDate.toISOString(),
            rsvp_deadline: event.rsvpDeadline?.toISOString()
                ?? null,
            image_url: event.image,
        }));

    const { data, error } =
        await supabase
            .from("events")
            .insert(eventsToInsert)
            .select();

    if (error) {
        console.error(error);
        return;
    }

    console.log(
        `Inserted ${data.length} events`
    );
}

seedEvents();