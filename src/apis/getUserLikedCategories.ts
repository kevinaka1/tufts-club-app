import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { CategoryType } from "@/types/category";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserLikedCategories(userId: string) {
    const { data, error } = await supabase
        .from("user_liked_categories")
        .select(`user_id,
            category:categories(id, name)
            `)
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return [];
    }

    const userLikedCategories: CategoryType[] = data.map(row => row.category);


    console.log(JSON.stringify(userLikedCategories, null, 2));

    return userLikedCategories ? userLikedCategories : []

}