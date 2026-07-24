import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { categories } from "../mockData/categories";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const categoriesToInsert = categories.map(
    (category) => ({
        name: category.name,
        mock_id: category.id,
    })
);

async function seedCategories() {
    const { data, error } = await supabase
        .from("categories")
        .insert(categoriesToInsert)
        .select();

    if (error) {
        console.error(error);
        return;
    }

    console.log(
        `Inserted ${data.length} categories`
    );
}

seedCategories();