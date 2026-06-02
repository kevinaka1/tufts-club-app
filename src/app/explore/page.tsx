"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users,
    Calendar,
    Heart,
} from "lucide-react";

import { allClubs } from "@/data/clubs";
import { allEvents } from "@/data/events";
import { mockUsers } from "@/data/userProfiles";

const SIX_MONTHS =
    1000 * 60 * 60 * 24 * 30 * 6;

const newClubs = allClubs.filter(
    (club) => {
        const createdTime =
            club.createdAt.getTime();

        return (
            Date.now() -
            createdTime <
            SIX_MONTHS
        );
    }
);

const popularClubs = [
    ...allClubs,
]
    .sort(
        (a, b) =>
            b.members -
            a.members
    )
    .slice(0, 5);

const upcomingCampusEvents =
    allEvents
        .filter(
            (event) =>
                event.type ===
                "campus" &&
                event.startDate >
                new Date()
        )
        .sort(
            (a, b) =>
                a.startDate.getTime() -
                b.startDate.getTime()
        )
        .slice(0, 3);

export default function ExplorePage() {
    const currentUser = mockUsers[0];

    const usersLikedCategories = currentUser.likedCategories
    const [
        randomCategory,
        setRandomCategory,
    ] = useState<
        string | null
    >(null);

    useEffect(() => {
        if (!usersLikedCategories.length) return;

        const randomIndex = Math.floor(
            Math.random() *
            usersLikedCategories.length
        );

        setRandomCategory(
            usersLikedCategories[randomIndex]
        );
    }, [usersLikedCategories]);

    const recommendedClubs =
        randomCategory
            ? allClubs.filter(
                (club) =>
                    club.categories.includes(
                        randomCategory
                    )
            )
            : [];

    return (
        <div className="pb-28">
            <div className="bg-primary text-primary-foreground px-4 pt-6 pb-4">
                <h1 className="mb-4">
                    Discover
                    Clubs and
                    Events
                </h1>
            </div>

            {/* NEW CLUBS */}

            <section className="px-4 mt-6">
                <div className="flex items-center justify-between mb-3">
                    <h2>
                        New
                    </h2>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                    {newClubs.map(
                        (club) => (
                            <Link
                                key={
                                    club.id
                                }
                                href={`/clubs/${club.id}`}
                                className="flex-shrink-0 w-64"
                            >
                                <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                                    <div className="relative h-36">
                                        <img
                                            src={
                                                club.image
                                            }
                                            alt={
                                                club.name
                                            }
                                            className="w-full h-full object-cover"
                                        />

                                        <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                                            New
                                        </span>
                                    </div>

                                    <div className="p-3">
                                        <h3 className="mb-1">
                                            {
                                                club.name
                                            }
                                        </h3>

                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div>
                                                {club.categories.map(
                                                    (
                                                        category,
                                                        index
                                                    ) => (
                                                        <span
                                                            key={
                                                                category
                                                            }
                                                        >
                                                            {
                                                                category
                                                            }
                                                            {index <
                                                                club.categories.length -
                                                                1 &&
                                                                ", "}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {
                                                    club.members
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </section>

            {/* CAMPUS EVENTS */}

            <section className="px-4 mt-8">
                <div className="flex items-center justify-between mb-3">
                    <h2>
                        Upcoming
                        Campus
                        Events
                    </h2>

                    <Link
                        href="/events?tab=campus"
                        className="text-sm text-primary"
                    >
                        View All
                    </Link>
                </div>

                <div className="space-y-3">
                    {upcomingCampusEvents.map(
                        (
                            event
                        ) => (
                            <div
                                key={
                                    event.id
                                }
                                className="bg-card border border-border rounded-xl p-4"
                            >
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="mb-1">
                                            {
                                                event.name
                                            }
                                        </h4>

                                        {event.organizer && (
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Organized
                                                by{" "}
                                                {
                                                    event.organizer
                                                }
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                            <span>
                                                {event.startDate.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        month:
                                                            "short",
                                                        day:
                                                            "numeric",
                                                    }
                                                )}
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {event.startDate.toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                        hour:
                                                            "numeric",
                                                        minute:
                                                            "2-digit",
                                                    }
                                                )}{" "}
                                                -{" "}
                                                {event.endDate.toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                        hour:
                                                            "numeric",
                                                        minute:
                                                            "2-digit",
                                                    }
                                                )}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1">
                                            {
                                                event.location
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* RECOMMENDED */}

            {randomCategory && (
                <section className="px-4 mt-8">
                    <h2 className="mb-3">
                        Because
                        You Like{" "}
                        {
                            randomCategory
                        }
                    </h2>

                    <div className="space-y-3">
                        {recommendedClubs.map(
                            (
                                club
                            ) => (
                                <Link
                                    key={
                                        club.id
                                    }
                                    href={`/clubs/${club.id}`}
                                    className="block bg-card rounded-xl p-4 border border-border"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h4 className="mb-1">
                                                {
                                                    club.name
                                                }
                                            </h4>

                                            <p className="text-sm text-muted-foreground">
                                                {club.categories.join(
                                                    ", "
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <Heart className="w-4 h-4" />
                                            </button>

                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {
                                                    club.members
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* POPULAR CLUBS */}

            <section className="px-4 mt-8">
                <h2 className="mb-3">
                    Popular
                    Clubs
                </h2>

                <div className="space-y-3">
                    {popularClubs.map(
                        (club) => (
                            <Link
                                key={
                                    club.id
                                }
                                href={`/clubs/${club.id}`}
                                className="block bg-card rounded-xl p-4 border border-border"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h4 className="mb-1">
                                            {
                                                club.name
                                            }
                                        </h4>

                                        <p className="text-sm text-muted-foreground">
                                            {club.categories.join(
                                                ", "
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                            <Heart className="w-4 h-4" />
                                        </button>

                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {
                                                club.members
                                            }
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </section>

            {/* FORMING CLUBS */}

            <section className="px-4 mt-8">
                <Link
                    href="/forming"
                    className="block bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl p-6 shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6" />
                        </div>

                        <div className="flex-1">
                            <h3 className="mb-1">
                                Clubs in
                                Formation
                            </h3>

                            <p className="text-sm opacity-90">
                                Join new
                                clubs
                                looking
                                for
                                founding
                                members
                            </p>
                        </div>
                    </div>
                </Link>
            </section>
        </div>
    );
}