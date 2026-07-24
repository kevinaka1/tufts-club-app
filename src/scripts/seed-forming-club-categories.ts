import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { formingClubs } from "../mockData/formingClubs";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedFormingClubCategories() {
    // Get clubs
    const { data: theFormingClubs, error: clubsError } = await supabase
        .from("forming_clubs")
        .select("id, mock_id");

    if (clubsError) throw clubsError;

    // Get categories
    const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id, mock_id");

    if (categoriesError) throw categoriesError;

    // Build lookup maps
    const theFormingClubIdMap = Object.fromEntries(
        theFormingClubs.map((club) => [club.mock_id, club.id])
    );

    const categoryIdMap = Object.fromEntries(
        categories.map((category) => [category.mock_id, category.id])
    );

    // Build join table rows
    const rows = formingClubs.flatMap((club) =>
        club.categories.map((categoryMockId) => ({
            forming_club_id: theFormingClubIdMap[club.id],
            category_id: categoryIdMap[categoryMockId],
        }))
    );
    console.log(rows.filter(row => !row.forming_club_id));
    // Insert
    const { error } = await supabase
        .from("forming_club_categories")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} forming_club_categories`);
}

seedFormingClubCategories();