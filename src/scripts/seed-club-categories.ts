import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { allClubs } from "../mockData/clubs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedClubCategories() {
    // Get clubs
    const { data: clubs, error: clubsError } = await supabase
        .from("clubs")
        .select("id, mock_id");

    if (clubsError) throw clubsError;

    // Get categories
    const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id, mock_id");

    if (categoriesError) throw categoriesError;

    // Build lookup maps
    const clubIdMap = Object.fromEntries(
        clubs.map((club) => [club.mock_id, club.id])
    );

    const categoryIdMap = Object.fromEntries(
        categories.map((category) => [category.mock_id, category.id])
    );

    // Build join table rows
    const rows = allClubs.flatMap((club) =>
        club.categories.map((categoryMockId) => ({
            club_id: clubIdMap[club.id],
            category_id: categoryIdMap[categoryMockId],
        }))
    );
    console.log(rows.filter(row => !row.club_id));
    // Insert
    const { error } = await supabase
        .from("club_categories")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} club_categories`);
}

seedClubCategories();