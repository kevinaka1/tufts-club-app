import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { allClubs } from "../mockData/clubs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const clubsToInsert = allClubs.map(({ categories, ...club }) => ({
    name: club.name,
    mock_id: club.id,
    description: club.description,
    mission: club.mission,
    image_url: club.image,
    banner_url: club.banner,
    logo_url: club.logo,
    meeting_time: club.meetingTime,
    location: club.location,
    email: club.email,
    instagram: club.instagram,
    members: club.members,
    created_at: new Date(club.createdAt).toISOString(),
}));

async function seedClubs() {
    const { data, error } = await supabase
        .from("clubs")
        .insert(clubsToInsert)
        .select();

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${data.length} clubs`);
}

seedClubs();