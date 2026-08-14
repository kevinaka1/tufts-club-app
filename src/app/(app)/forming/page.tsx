import { Suspense } from "react";
import ClubsInFormation from "./FormingClubsPage";
import { getAllFormingClubs } from "@/apis/getAllFormingClubs";
import { getUserInterestedFormingClubIds } from "@/apis/getUserInterestedFormingClubsIds";
import { createClient } from "@/lib/supabase-server";

export default async function Page() {


    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user!.id

    const formingClubs = await getAllFormingClubs();
    const initialInterestedClubIds = await getUserInterestedFormingClubIds(userId);




    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClubsInFormation formingClubs={formingClubs} initialInterestedClubIds={initialInterestedClubIds} />
        </Suspense>
    );
}