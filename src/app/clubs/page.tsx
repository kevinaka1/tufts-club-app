import { ClubsDirectory } from "./ClubsDirectory";
import { getAllClubs } from "@/apis/getAllClubs";
import { getUserLikedCategories } from "@/apis/getUserLikedCategories";
import { getAllCategories } from "@/apis/getAllCategories";

// app/clubs/page.tsx
export default async function ClubsPage() {
    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744"
    const allClubsNormalized = await getAllClubs();
    const usersLikedCategories = await getUserLikedCategories(userId);
    const categories = await getAllCategories();

    return <ClubsDirectory userId={userId} allClubs={allClubsNormalized}
        usersLikedCategories={usersLikedCategories}
        categories={categories} />;
}