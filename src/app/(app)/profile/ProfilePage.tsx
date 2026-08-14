"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser-client";
import Link from "next/link";
import {
    User,
    Calendar,
    Users,
    Heart,
    Tag,
    X,
    LogOut
} from "lucide-react";
import { CategoryType } from "@/types/category";
import { CategoryResponse, FollowedClubResponse, UserProfileResponse } from "@/types/apiResponses";
import { useRouter } from "next/navigation";

export default function Profile({
    user,
    userLikedCategories,
    userFollowedClubs,

}: {
    user: UserProfileResponse | undefined,
    userLikedCategories: CategoryResponse[],
    userFollowedClubs: FollowedClubResponse[]
}) {

    const router = useRouter();
    const [likedCategories, setLikedCategories] =
        useState(new Map(userLikedCategories.map(c => [c.id, c])))
        ;
    const [followedClubs, setFollowedClubs] = useState(new Map(userFollowedClubs.map(f => [f.id, f])));

    const removeCategory = async (category: CategoryType) => {
        setLikedCategories((prev) => {
            const next = new Map(prev);
            next.delete(category.id);
            return next;
        });


        try {
            const response = await fetch("/api/userLikedCategories", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryId: category.id
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

        } catch (err) {
            console.error(err);
            setLikedCategories((prev) => {
                const next = new Map(prev);
                next.set(category.id, category);
                return next;
            });
        }
    };
    const unfollowClub = async (initClub: FollowedClubResponse) => {
        setFollowedClubs((prev) => {
            const next = new Map(prev);
            next.delete(initClub.id)
            return next
        })

            ;
        try {
            const response = await fetch("/api/userFollowedClubs", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clubId: initClub.id
                }),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

        } catch (err) {
            console.error(err);
            setFollowedClubs(prev => {
                const next = new Map(prev);
                next.set(initClub.id, initClub);
                return next;
            });
        }

    };

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Failed to log out:", error);
            return;
        }

        router.push("/login");
    }


    return (
        <div className="pb-28">
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground px-4 pt-6 pb-16 rounded-b-3xl">
                <div className="flex items-center justify-between mb-6">
                    <h1>Profile</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10" />
                    </div>

                    <div>
                        <h2 className="mb-1">
                            {user?.firstName}{" "}
                            {user?.lastName}
                        </h2>

                        <p className="text-sm opacity-90">
                            Class of{" "}
                            {user?.graduationYear}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 -mt-6">
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm mb-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-5 h-5 text-primary flex-shrink-0" />

                            <div>
                                <p className="text-muted-foreground">
                                    Class Year
                                </p>

                                <p className="font-medium">
                                    {user?.graduationYear}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <User className="w-5 h-5 text-primary flex-shrink-0" />

                            <div>
                                <p className="text-muted-foreground">
                                    Email
                                </p>

                                <p className="font-medium">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Heart className="w-5 h-5 text-primary flex-shrink-0" />

                            <div>
                                <p className="text-muted-foreground">
                                    Interests
                                </p>

                                <p className="font-medium">
                                    {likedCategories.size} interests
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <Heart className="w-5 h-5 text-primary flex-shrink-0" />

                            <div>
                                <p className="text-muted-foreground">
                                    Following
                                </p>

                                <p className="font-medium">
                                    {followedClubs.size} clubs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-3">Interests</h3>
                    {likedCategories.size > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {Array.from(likedCategories.values()).map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => removeCategory(category)}
                                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm flex items-center gap-2 hover:bg-destructive/20 hover:text-destructive transition-colors"
                                >
                                    <Tag className="w-3 h-3" />
                                    {category.name}
                                    <X className="w-3 h-3" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No interests selected. Go to Clubs to like categories!
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <h3 className="mb-3">
                        Clubs You Follow
                    </h3>


                    {followedClubs.size > 0 ? (
                        <p className="text-sm text-muted-foreground mb-4">
                            {followedClubs.size} clubs
                        </p>
                    ) : <p className="text-sm text-muted-foreground mb-4">
                        No clubs followed. Go follow some clubs!</p>}


                </div>

                <div className="space-y-3">
                    {Array.from(followedClubs.values()).map((club) => (
                        <div
                            key={club.id}
                            className="flex items-center gap-3 bg-card border border-border rounded-xl p-3"
                        >
                            <Link
                                key={club.id}
                                href={`/clubs/${club.id}`}
                                className="flex items-center gap-3 flex-1 min-w-0"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                    <img
                                        src={club.image}
                                        alt={club.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="mb-1">
                                        {club.name}
                                    </h4>

                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span>
                                            {club.categories.map((category) => category?.name).join(
                                                ", "
                                            )}
                                        </span>

                                        <span>•</span>

                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {club.members}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    unfollowClub(club);
                                }}
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-8 space-y-3">
                    <button
                        onClick={logOut}
                        className="w-full py-3 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center gap-2 hover:bg-destructive/20 active:scale-[0.98] transition">
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}