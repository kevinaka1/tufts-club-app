import { Suspense } from "react";
import Profile from "./ProfilePage";
import { getUserProfile } from "@/apis/getUserProfile";
import { getUserLikedCategories } from "@/apis/getUserLikedCategories";
import { getUserFollowedClubs } from "@/apis/getUserFollowedClubs";
import { createClient } from "@/lib/supabase-server";

export default async function Page() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user!.id

    const userProfile = await getUserProfile(userId);
    const userLikedCategories = await getUserLikedCategories(userId);
    const userFollowedClubs = await getUserFollowedClubs(userId)


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Profile user={userProfile}
                userLikedCategories={userLikedCategories}
                userFollowedClubs={userFollowedClubs} />
        </Suspense>
    );
}