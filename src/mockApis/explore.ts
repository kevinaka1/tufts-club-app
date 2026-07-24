import { allClubs } from "@/mockData/clubs";
import { allEvents } from "@/mockData/events";
import { mockUsers } from "@/mockData/userProfiles";
import { categories } from "@/mockData/categories";
import { ClubType } from "@/types/club";
import { CategoryType } from "@/types/category";
import { ExploreApiResponse } from "@/types/apiResponses";



const SIX_MONTHS =
    1000 * 60 * 60 * 24 * 30 * 6;

// creates a hashmap mapping category ids to categoru objects
const categoryMap = Object.fromEntries(
    categories.map((c) => [c.id, c])
);

// function that returns the category objects given a club
const clubCategory = (club: ClubType): CategoryType[] =>
    club.categories.map((id: string) => categoryMap[id]);

// finds all new clubs and returns all the info the explore page needs
// objects like I would get from an API
const newClubs = allClubs
    .filter(
        (club) =>
            Date.now() - club.createdAt.getTime() <
            SIX_MONTHS
    )
    .map((club) => ({
        id: club.id,
        name: club.name,
        image: club.image,
        members: club.members,
        categories: clubCategory(club),
    }));

// finds all popular clubs and returns all the info the explore page needs
//  like I would get from an API
const popularClubs = [...allClubs]
    .sort((a, b) => b.members - a.members)
    .slice(0, 5)
    .map((club) => ({
        id: club.id,
        name: club.name,
        image: club.image,
        members: club.members,
        categories: clubCategory(club),
    }));

// finds all upcoming clubs and returns all the info the explore page needs
// objects like I would get from an API
const upcomingCampusEvents = allEvents
    .filter(
        (event) =>
            event.type === "campus" &&
            event.startDate > new Date()
    )
    .sort(
        (a, b) =>
            a.startDate.getTime() - b.startDate.getTime()
    )
    .slice(0, 3)
    .map((event) => ({
        id: event.id,
        name: event.name,
        location: event.location,
        startDate: event.startDate,
        endDate: event.endDate,
        organizer: event.organizer ?? "",
        image: event.image,
    }));

const currentUser = mockUsers[0];


const randomCategoryId =
    currentUser.likedCategories.length
        ? currentUser.likedCategories[
        Math.floor(
            Math.random() *
            currentUser.likedCategories.length
        )
        ]
        : null;

const randomCategory =
    randomCategoryId
        ? categoryMap[randomCategoryId]
        : null;

const recommendedClubs = randomCategoryId
    ? allClubs
        .filter((club) =>
            club.categories.includes(
                randomCategoryId
            )
        )
        .map((club) => ({
            id: club.id,
            name: club.name,
            members: club.members,
            categories: clubCategory(club),
        }))
    : [];

export const exploreApiResponse: ExploreApiResponse = {
    newClubs,
    popularClubs,
    upcomingCampusEvents,
    recommendedClubs,
    randomCategory,
};

console.log(exploreApiResponse)