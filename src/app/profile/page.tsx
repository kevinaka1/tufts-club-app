"use client";

import { useState } from "react";
import Link from "next/link";
import {
    User,
    Calendar,
    Users,
    Heart,
    Tag,
    X
} from "lucide-react";
import { mockUsers } from "@/data/userProfiles";
import { allClubs } from "@/data/clubs";

export default function Profile() {
    // temporary current user
    const currentUser = mockUsers[0];
    const userLikedCategories = currentUser.likedCategories
    const userFollowedClubs = allClubs.filter((club) =>
        currentUser.followedClubs.includes(club.id)
    );
    const [likedCategories, setLikedCategories] = useState<Set<string>>(
        new Set(userLikedCategories)
    );
    const [followedClubs, setFollowedClubs] = useState(userFollowedClubs);

    const removeCategory = (category: string) => {
        setLikedCategories((prev) => {
            const next = new Set(prev);
            next.delete(category);
            return next;
        });
    };
    const unfollowClub = (clubId: string) => {
        setFollowedClubs((prev) => prev.filter((club) => club.id !== clubId));
    };


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
                            {currentUser.firstName}{" "}
                            {currentUser.lastName}
                        </h2>

                        <p className="text-sm opacity-90">
                            Class of{" "}
                            {currentUser.graduationYear}
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
                                    {currentUser.graduationYear}
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
                                    {currentUser.email}
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
                                    {followedClubs.length} clubs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-3">Interests</h3>
                    {likedCategories.size > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {Array.from(likedCategories).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => removeCategory(category)}
                                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm flex items-center gap-2 hover:bg-destructive/20 hover:text-destructive transition-colors"
                                >
                                    <Tag className="w-3 h-3" />
                                    {category}
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

                    <p className="text-sm text-muted-foreground mb-4">
                        {followedClubs.length} clubs
                    </p>
                </div>

                <div className="space-y-3">
                    {followedClubs.map((club) => (
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
                                            {club.categories.join(
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
                                    unfollowClub(club.id);
                                }}
                                className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/20 transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}