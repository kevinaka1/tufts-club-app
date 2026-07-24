import Explore from "./Explore";
import { getUserLikedCategories } from "@/apis/getUserLikedCategories";
import { getNewClubs } from "@/apis/getNewClubs";
import { getPopularClubs } from "@/apis/getPopularClubs";
import { getUpcomingCampusEvents } from "@/apis/getUpcomingCampusEvents";
import { getRecommendedClubs } from "@/apis/getRecommendedClubs";


export default async function ExplorePage() {

    const userId = "2e8c0d17-2058-49d0-bce8-d9559fe3b744";
    const newClubs = await getNewClubs();
    const popularClubs = await getPopularClubs();
    const exploreEvents = await getUpcomingCampusEvents();
    const upcomingCampusEvents = exploreEvents?.slice(0, 3).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    const likedCategories = await getUserLikedCategories(userId);
    const randomCategory =
        likedCategories && likedCategories.length > 0
            ? likedCategories[Math.floor(Math.random() * likedCategories.length)]
            : null
    const recommendedClubs = await getRecommendedClubs(randomCategory?.id);

    return <Explore newClubs={newClubs} popularClubs={popularClubs}
        upcomingCampusEvents={upcomingCampusEvents}
        randomCategory={randomCategory}
        recommendedClubs={recommendedClubs}
    />;
}