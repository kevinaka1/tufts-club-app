"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Heart,
    Calendar,
    MapPin,
    Clock,
    Mail,
    Users,
    Tag,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { CategoryType } from "@/types/category";
import { getSimilarClubs } from "@/apis/getSimilarClubs";
import { getClub } from "@/apis/getClub";
import { getClubEvents } from "@/apis/getClubEvents";
import { ClubDetailsEvent, ClubDetailsResponseClub, ClubDetailsSimilarClub } from "@/types/apiResponses";


export function ClubDetails({
    userId,
    club,
    alreadyJoinedClub,
    upcomingEvents,
    similarClubs
}: {
    userId: string,
    club: ClubDetailsResponseClub | undefined,
    alreadyJoinedClub: boolean
    upcomingEvents: ClubDetailsEvent[] | undefined,
    similarClubs: ClubDetailsSimilarClub[] | undefined
}) {


    const router = useRouter();
    const [alreadyJoined, setAlreadyJoined] =
        useState(alreadyJoinedClub);

    if (!club) {
        return <div>Club not found</div>;
    }

    const handleClubJoining = async () => {
        const joinedClub = alreadyJoined
        setAlreadyJoined(!alreadyJoined)
        try {
            let response;
            if (joinedClub) {
                response = await fetch("/api/userFollowedClubs", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        clubId: club.id,
                    }),
                });
            } else {
                response = await fetch("/api/userFollowedClubs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        clubId: club.id,
                    }),
                });
            }

            if (!response.ok) {
                throw new Error("Request failed");
            }
        } catch (err) {
            console.error(err);

            setAlreadyJoined(!alreadyJoined)
        }

    }



    return (
        <div className="pb-28">
            <div className="relative">
                <div className="h-48 overflow-hidden">
                    <img
                        src={club.banner}
                        alt={club.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <button
                    onClick={() => router.back()}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                    onClick={handleClubJoining}
                    className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center ${alreadyJoined
                        ? "bg-primary text-primary-foreground"
                        : "bg-black/50 text-white"
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${alreadyJoined
                            ? "fill-current"
                            : ""
                            }`}
                    />
                </button>

                <div className="absolute -bottom-12 left-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-card border-4 border-background shadow-lg">
                        <img
                            src={club.logo}
                            alt={`${club.name} logo`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="px-4 mt-16">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <h1 className="mb-1">
                            {club.name}
                        </h1>

                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {club.members} members
                        </p>
                    </div>

                    <button
                        onClick={handleClubJoining}
                        className={`px-6 py-2 rounded-full ${alreadyJoined
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                            }`}
                    >
                        {alreadyJoined
                            ? "Joined"
                            : "Join"}
                    </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {club.categories.map(
                        (category) => {
                            const categoryName = category.name
                            return (
                                <span
                                    key={category.id}
                                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm flex items-center gap-1"
                                >
                                    <Tag className="w-3 h-3" />
                                    {categoryName}
                                </span>
                            )
                        }
                    )}
                </div>

                <section className="mb-6">
                    <h3 className="mb-2">
                        About
                    </h3>

                    <p className="text-muted-foreground mb-3">
                        {club.description}
                    </p>

                    <p className="text-muted-foreground">
                        {club.mission}
                    </p>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3">
                        Meeting Details
                    </h3>

                    <div className="space-y-3 bg-muted rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                            <div>
                                <p className="text-sm font-medium">
                                    When
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {club.meetingTime}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />

                            <div>
                                <p className="text-sm font-medium">
                                    Where
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {club.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3">
                        Upcoming Events
                    </h3>

                    <div className="space-y-3">
                        {upcomingEvents && upcomingEvents.length >
                            0 ? (
                            upcomingEvents.map(
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

                                                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />

                                                    {
                                                        event.location
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
                                No upcoming
                                events yet.
                            </div>
                        )}
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3">
                        Contact
                    </h3>

                    <div className="space-y-2">
                        <a
                            href={`mailto:${club.email}`}
                            className="flex items-center gap-3 py-3 px-4 bg-muted rounded-lg"
                        >
                            <Mail className="w-5 h-5 text-primary" />
                            <span>
                                {club.email}
                            </span>
                        </a>

                        <a
                            href={`https://instagram.com/${club.instagram.replace(
                                "@",
                                ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 py-3 px-4 bg-muted rounded-lg"
                        >
                            <FaInstagram className="w-5 h-5 text-primary" />
                            <span>
                                {club.instagram}
                            </span>
                        </a>
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="mb-3">
                        Similar Clubs
                    </h3>
                    {similarClubs && similarClubs.length > 0 ? (
                        <div className="space-y-3">
                            {similarClubs?.map(
                                (similarClub) => {
                                    const similarClubCategoryNames = similarClub.categories.map((similarClubCategory: CategoryType) =>
                                        similarClubCategory.name
                                    ).join(
                                        ", "
                                    )
                                    return (
                                        <Link
                                            key={similarClub.id}
                                            href={`/clubs/${similarClub.id}`}
                                            className="flex items-center justify-between py-3 px-4 bg-card border border-border rounded-lg"
                                        >
                                            <div>
                                                <h4>
                                                    {similarClub.name}
                                                </h4>

                                                <p className="text-sm text-muted-foreground">
                                                    {similarClubCategoryNames}
                                                </p>
                                            </div>

                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {
                                                    similarClub.members
                                                }
                                            </span>
                                        </Link>
                                    )
                                }
                            )}
                        </div>
                    ) : (<p className="text-sm text-muted-foreground mb-4">
                        There are no clubs like this one. It's one of a kind!</p>)}
                </section>
            </div>
        </div>
    );
}