import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { UserProfileResponse } from "@/types/apiResponses";


const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserProfile(
    userId: string
) {
    const { data, error } = await supabase
        .from("users")
        .select(`id,
                 first_name,
                 last_name,
                 email,
                 graduation_year`)
        .eq("id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const user: UserProfileResponse = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        graduationYear: data.graduation_year
    }

    console.log(JSON.stringify(user, null, 2));

    return user;
}

