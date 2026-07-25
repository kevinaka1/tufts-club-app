import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function postUserLikedCategory(
    userId: string,
    categoryId: string
) {
    const { error } = await supabase
        .from("user_liked_categories")
        .upsert(
            {
                user_id: userId,
                category_id: categoryId,
            },
            {
                onConflict: "user_id,category_id",
            }
        );
    return { error };
}