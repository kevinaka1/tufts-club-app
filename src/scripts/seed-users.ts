import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { mockUsers } from "../mockData/userProfiles";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const usersToInsert = mockUsers.map(({ id, ...user }) => ({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    graduation_year: user.graduationYear,
    mock_id: id,
}));

async function seedUsers() {
    const { data, error } = await supabase
        .from("users")
        .insert(usersToInsert)
        .select();

    if (error) {
        console.error(error);
        return;
    }

    console.log(`Inserted ${data.length} users`);
}

seedUsers();