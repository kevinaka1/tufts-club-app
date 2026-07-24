import { allClubs } from "@/mockData/clubs";
import { categories } from "@/mockData/categories";
import { mockUsers } from "@/mockData/userProfiles";
import { UserProfileApiResponse } from "@/types/apiResponses";

export function getUserProfileApiResponse(userId = "u1"): UserProfileApiResponse {
    const user =
        mockUsers.find(
            (u) => u.id === userId
        ) ?? mockUsers[0];

    const userLikedCategories = user.likedCategories
        .map((categoryId) => {
            const category = categories.find(
                (c) => c.id === categoryId
            );

            if (!category) {
                throw new Error(
                    `Category ${categoryId} not found`
                );
            }

            return {
                id: category.id,
                name: category.name,
            };
        })
        .filter(Boolean);

    const userFollowedClubs = allClubs
        .filter((club) =>
            user.followedClubs.includes(club.id)
        )
        .map((club) => ({
            id: club.id,
            name: club.name,
            image: club.image,
            members: club.members,

            categories: club.categories
                .map((categoryId) => {
                    const category = categories.find(
                        (c) => c.id === categoryId
                    );

                    if (!category) {
                        throw new Error(
                            `Category ${categoryId} not found`
                        );
                    }

                    return {
                        id: category.id,
                        name: category.name,
                    }
                        ;
                })
                .filter(Boolean),
        }));

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            graduationYear: user.graduationYear,
        },

        userLikedCategories,
        userFollowedClubs,
    };
}