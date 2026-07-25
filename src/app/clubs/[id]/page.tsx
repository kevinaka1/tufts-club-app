import { ClubDetails } from "../../screens/ClubDetails";
import { getClub } from "@/apis/getClub";
import { getClubEvents } from "@/apis/getClubEvents";
import { getSimilarClubs } from "@/apis/getSimilarClubs";
import { getUserFollowedClubs } from "@/apis/getUserFollowedClubs";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744";
    const userFollowedClubs = await getUserFollowedClubs(userId)
    const followedClubIds = new Set(
        userFollowedClubs.map(club => club.id)
    );
    const alreadyJoined = followedClubIds.has(id);
    const club = await getClub(id);
    const upcomingEvents = await getClubEvents(id)
    const similarClubs = await getSimilarClubs(id)


    return <ClubDetails userId={userId} club={club} alreadyJoinedClub={alreadyJoined} upcomingEvents={upcomingEvents}
        similarClubs={similarClubs} />;
}