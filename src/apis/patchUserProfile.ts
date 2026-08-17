import { createClient } from "@/lib/supabase-server";

export async function patchUserProfile(
    userId: string,
    graduationYear: number
) {

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("users")
        .update({
            graduation_year: graduationYear,
        })
        .eq("id", userId)

    return {
        data,
        error,
    };
}