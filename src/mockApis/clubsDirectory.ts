import { allClubs } from "@/mockData/clubs";
import { categories } from "@/mockData/categories";
import { mockUsers } from "@/mockData/userProfiles";
import { ClubType } from "@/types/club";
import { CategoryType } from "@/types/category";
import { ClubsDirectoryApiResponse } from "@/types/apiResponses";


// creates a hashmap mapping category ids to categoru objects
const categoryMap = Object.fromEntries(
    categories.map((c) => [c.id, c])
);

// function that returns the category objects given a club
const clubCategory = (club: ClubType): CategoryType[] =>
    club.categories.map((id: string) => categoryMap[id]);



const allClubsNormalized = allClubs
    .map((club) => ({
        id: club.id,
        name: club.name,
        description: club.description,
        image: club.image,
        members: club.members,
        categories: clubCategory(club),
        createdAt: club.createdAt,
    }));

const currentUser = mockUsers[0];
const userLikedCategoriesIDs = currentUser.likedCategories
const usersLikedCategories = userLikedCategoriesIDs.map((userLikedCategoriesID) =>
    categoryMap[userLikedCategoriesID]
)

export const clubsDirectoryApiResponse: ClubsDirectoryApiResponse = {
    allClubsNormalized,
    usersLikedCategories,
    categories
};