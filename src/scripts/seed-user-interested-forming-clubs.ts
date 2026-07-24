import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { mockUsers } from "../mockData/userProfiles";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedUserInterestedFormingClubs() {
    // Get forming clubs
    const { data: formingClubs, error: formingClubsError } = await supabase
        .from("forming_clubs")
        .select("id, mock_id");

    if (formingClubsError) {
        console.error(formingClubsError);
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
    const formingClubIdMap = Object.fromEntries(
        formingClubs.map((formingClub) => [formingClub.mock_id, formingClub.id])
    );

    const userIdMap = Object.fromEntries(
        users.map((user) => [user.mock_id, user.id])
    );

    // Build join table rows
    const rows = mockUsers.flatMap((user) =>
        user.interestedFormingClubs.map((interestedFormingClubId) => ({
            user_id: userIdMap[user.id],
            forming_club_id: formingClubIdMap[interestedFormingClubId],
        }))
    );

    // Insert
    const { error } = await supabase
        .from("user_interested_forming_clubs")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} user_interested_forming_clubs`);
}

seedUserInterestedFormingClubs().catch((err) => {
    console.error(err);
});