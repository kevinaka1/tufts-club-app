import { createClient } from "@supabase/supabase-js";
import { allClubs } from "@/data/clubs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const clubsToInsert = allClubs.map(
    ({ id, categories, ...club }) => ({
        ...club,
        createdAt: club.createdAt.toISOString(),
    })
);

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