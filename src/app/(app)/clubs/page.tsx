import { ClubsDirectory } from "./ClubsDirectory";
import { getAllClubs } from "@/apis/getAllClubs";
import { getUserLikedCategories } from "@/apis/getUserLikedCategories";
import { getAllCategories } from "@/apis/getAllCategories";
import { createClient } from "@/lib/supabase-server";

// app/clubs/page.tsx
export default async function ClubsPage() {


    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user!.id

    const allClubsNormalized = await getAllClubs();
    const usersLikedCategories = await getUserLikedCategories(userId);
    const categories = await getAllCategories();

    return <ClubsDirectory allClubs={allClubsNormalized}
        usersLikedCategories={usersLikedCategories}
        categories={categories} />;
}