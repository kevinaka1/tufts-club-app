import { formingClubs } from "../mockData/formingClubs";
import { categories } from "../mockData/categories";
import { mockUsers } from "../mockData/userProfiles";
import { FormingClubsApiResponse } from "@/types/apiResponses";


const categoryMap = Object.fromEntries(
    categories.map((category) => [category.id, category])
);
const formingClubsNormalized = formingClubs.map(club => ({
    id: club.id,
    name: club.name,
    description: club.description,
    categories: club.categories.map(
        categoryId => categoryMap[categoryId]
    ),
}));

const currentUser = mockUsers[0];

export const formingClubsApiResponse : FormingClubsApiResponse = {
    formingClubs: formingClubsNormalized,
    initialInterestedClubIds:
        currentUser.interestedFormingClubs,
};