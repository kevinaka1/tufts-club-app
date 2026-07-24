"use client";
import Link from "next/link";
import {
    Users,
    Calendar,
    Heart,
} from "lucide-react";
import { CampusEvent, ExploreCampusEvent, ExploreClub } from "@/types/apiResponses";
import { CategoryType } from "@/types/category";


export default function Explore({
    newClubs,
    popularClubs,
    upcomingCampusEvents,
    randomCategory,
    recommendedClubs
}: {
    newClubs: ExploreClub[] | undefined,
    popularClubs: ExploreClub[] | undefined,
    upcomingCampusEvents: CampusEvent[] | undefined,
    randomCategory: CategoryType | null,
    recommendedClubs: ExploreClub[] | undefined,
}) {


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
                {newClubs && newClubs.length > 0 ? (
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                        {newClubs?.map(
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
                                                            index: number
                                                        ) => {
                                                            const categoryName = category.name
                                                            return (
                                                                <span
                                                                    key={
                                                                        category.id
                                                                    }
                                                                >
                                                                    {
                                                                        categoryName
                                                                    }
                                                                    {index <
                                                                        club.categories.length -
                                                                        1 &&
                                                                        ", "}
                                                                </span>
                                                            )
                                                        }
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
                    </div>) : (<p className="text-sm text-muted-foreground mb-4">
                        There are no new clubs this semester.</p>)
                }
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

                {upcomingCampusEvents && upcomingCampusEvents.length > 0 ? (
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
                    </div>) : (<p className="text-sm text-muted-foreground mb-4">
                        There are upcoming campus events currently. Wait for more!</p>)
                }
            </section>

            {/* RECOMMENDED */}

            {randomCategory && (
                <section className="px-4 mt-8">
                    <h2 className="mb-3">
                        Because
                        You Like{" "}
                        {
                            randomCategory.name
                        }
                    </h2>
                    {recommendedClubs && recommendedClubs.length > 0 ? (
                        <div className="space-y-3">
                            {recommendedClubs.map(
                                (
                                    club
                                ) => {
                                    const categoriesNames = club.categories.map((category) =>
                                        category.name
                                    )
                                    return (
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
                                                        {categoriesNames.join(
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
                                }
                            )}
                        </div>) : (<p className="text-sm text-muted-foreground mb-4">
                            There are no clubs that fit this category currently.</p>)
                    }
                </section>
            )}

            {/* POPULAR CLUBS */}

            <section className="px-4 mt-8">
                <h2 className="mb-3">
                    Popular
                    Clubs
                </h2>

                <div className="space-y-3">
                    {popularClubs?.map(
                        (club) => {
                            const categoriesNames = club.categories.map((category) =>
                                category.name
                            )
                            return (
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
                                                {categoriesNames.join(
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
                        }
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