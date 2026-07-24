import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { mockUsers } from "../mockData/userProfiles";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedUserRsvpdEvents() {
    // Get events
    const { data: events, error: eventsError } = await supabase
        .from("events")
        .select("id, mock_id");

    if (eventsError) {
        console.error(eventsError);
        return;
    }

    // Get users
    const { data: users, error: usersError } = await supabase
        .from("users")
        .select("id, mock_id");

    if (usersError) {
        console.error(usersError);
        return;
    }

    // Build lookup maps
    const eventIdMap = Object.fromEntries(
        events.map((event) => [event.mock_id, event.id])
    );

    const userIdMap = Object.fromEntries(
        users.map((user) => [user.mock_id, user.id])
    );

    // Build join table rows
    const rows = mockUsers.flatMap((user) =>
        user.rsvpdEvents.map((eventMockId) => ({
            user_id: userIdMap[user.id],
            event_id: eventIdMap[eventMockId],
        }))
    );

    // Insert
    const { error } = await supabase
        .from("user_rsvpd_events")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} user_rsvpd_events`);
}

seedUserRsvpdEvents().catch((err) => {
    console.error(err);
});