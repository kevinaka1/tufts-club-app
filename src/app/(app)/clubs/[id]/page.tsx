import { ClubDetails } from "./ClubDetails";
import { getClub } from "@/apis/getClub";
import { getClubEvents } from "@/apis/getClubEvents";
import { getSimilarClubs } from "@/apis/getSimilarClubs";
import { getUserFollowedClubs } from "@/apis/getUserFollowedClubs";
import { createClient } from "@/lib/supabase-server";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    const userId = user!.id

    const userFollowedClubs = await getUserFollowedClubs(userId)
    const followedClubIds = new Set(
        userFollowedClubs.map(club => club.id)
    );
    const alreadyJoined = followedClubIds.has(id);
    const club = await getClub(id);
    const upcomingEvents = await getClubEvents(id)
    const similarClubs = await getSimilarClubs(id)


    return <ClubDetails club={club} alreadyJoinedClub={alreadyJoined} upcomingEvents={upcomingEvents}
        similarClubs={similarClubs} />;
}