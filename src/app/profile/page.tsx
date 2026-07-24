import { Suspense } from "react";
import Profile from "./ProfilePage";
import { getUserProfile } from "@/apis/getUserProfile";
import { getUserLikedCategories } from "@/apis/getUserLikedCategories";
import { getUserFollowedClubs } from "@/apis/getUserFollowedClubs";

export default async function Page() {

    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744";
    const user = await getUserProfile(userId);
    const userLikedCategories = await getUserLikedCategories(userId);
    const userFollowedClubs = await getUserFollowedClubs(userId)


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Profile user={user}
                userLikedCategories={userLikedCategories}
                userFollowedClubs={userFollowedClubs} />
        </Suspense>
    );
}