import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { formingClubs } from "../mockData/formingClubs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const formingClubsToInsert = formingClubs.map(
    (club) => ({
        name: club.name,
        description: club.description,
        founding_member: club.foundingMember,
        mock_id: club.id,
    })
);

async function seedFormingClubs() {
    const { data, error } = await supabase
        .from("forming_clubs")
        .insert(formingClubsToInsert)
        .select();

    if (error) {
        console.error(error);
        return;
    }

    console.log(
        `Inserted ${data.length} forming clubs`
    );
}

seedFormingClubs();