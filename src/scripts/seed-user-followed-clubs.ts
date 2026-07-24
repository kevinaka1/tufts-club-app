import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { mockUsers } from "../mockData/userProfiles";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedUserFollowedClubs() {
    // Get clubs
    const { data: clubs, error: clubsError } = await supabase
        .from("clubs")
        .select("id, mock_id");

    if (clubsError) throw clubsError;

    // Get users
    const { data: users, error: usersError } = await supabase
        .from("users")
        .select("id, mock_id");

    if (usersError) throw usersError;

    // Build lookup maps
    const clubIdMap = Object.fromEntries(
        clubs.map((club) => [club.mock_id, club.id])
    );

    const userIdMap = Object.fromEntries(
        users.map((user) => [user.mock_id, user.id])
    );

    // Build join table rows
    const rows = mockUsers.flatMap((user) =>
        user.followedClubs.map((followedClubMockId) => ({
            user_id: userIdMap[user.id],
            club_id: clubIdMap[followedClubMockId],
        }))
    );

    // Insert
    const { error } = await supabase
        .from("user_followed_clubs")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} user_followed_clubs`);
}

seedUserFollowedClubs();