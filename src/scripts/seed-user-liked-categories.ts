import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { mockUsers } from "../mockData/userProfiles";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedUserLikedCategories() {
    // Get forming clubs
    const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id, mock_id");

    if (categoriesError) {
        console.error(categoriesError);
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
    const categoryIdMap = Object.fromEntries(
        categories.map((category) => [category.mock_id, category.id])
    );
    const userIdMap = Object.fromEntries(
        users.map((user) => [user.mock_id, user.id])
    );

    // Build join table rows
    const rows = mockUsers.flatMap((user) =>
        user.likedCategories.map((likedCategoryId) => ({
            user_id: userIdMap[user.id],
            category_id: categoryIdMap[likedCategoryId],
        }))
    );

    // Insert
    const { error } = await supabase
        .from("user_liked_categories")
        .insert(rows);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${rows.length} user_liked_categories`);
}

seedUserLikedCategories().catch((err) => {
    console.error(err);
});