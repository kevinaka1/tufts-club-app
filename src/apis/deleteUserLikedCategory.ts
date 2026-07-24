import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function deleteUserLikedCategory(
    userId: string,
    categoryId: string
) {
    const { error } = await supabase
        .from("user_liked_categories")
        .delete()
        .eq("user_id", userId)
        .eq("category_id", categoryId);

    return { error };

}

deleteUserLikedCategory("2e8c0d17-2058-49d0-bce8-d9559fe3b744", "1d391019-0e3b-4d9a-aa38-b24c777fd7d1");