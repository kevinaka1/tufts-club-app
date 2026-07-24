import { Suspense } from "react";
import ClubsInFormation from "./FormingClubsPage";
import { getAllFormingClubs } from "@/apis/getAllFormingClubs";
import { getUserInterestedFormingClubIds } from "@/apis/getUserInterestedFormingClubsIds";

export default async function Page() {


    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744";

    const formingClubs = await getAllFormingClubs();
    const initialInterestedClubIds = await getUserInterestedFormingClubIds(userId);




    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClubsInFormation userId={userId} formingClubs={formingClubs} initialInterestedClubIds={initialInterestedClubIds} />
        </Suspense>
    );
}