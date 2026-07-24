import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllCategories() {
    const { data: categories, error } = await supabase
        .from("categories")
        .select("id , name")
        ;

    if (error) {
        console.error(error);
        return [];
    }

    console.log(JSON.stringify(categories, null, 2));

    return categories ? categories : [];

}

getAllCategories();
