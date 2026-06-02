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
import { allClubs } from "@/data/clubs";
import { allEvents, type Event } from "@/data/events";


export function ClubDetails({
    clubId,
}: {
    clubId: string;
}) {


    const router = useRouter();
    const [alreadyJoined, setAlreadyJoined] =
        useState(false);

    const club = allClubs.find(
        (club) => club.id === clubId
    ) || allClubs["1"];

    const similarClubs = allClubs.filter(
        (currClub) =>
            currClub.id !== club.id &&
            currClub.categories.some((category) =>
                club.categories.includes(category)
            )
    );

    const upcomingEvents = allEvents
        .filter(
            (event: Event) =>
                event.clubId ===
                clubId &&
                event.startDate >
                new Date()
        )
        .sort(
            (
                a: Event,
                b: Event
            ) =>
                a.startDate.getTime() -
                b.startDate.getTime()
        );



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
                    onClick={() =>
                        setAlreadyJoined(!alreadyJoined)
                    }
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
                        onClick={() =>
                            setAlreadyJoined(
                                !alreadyJoined
                            )
                        }
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
                    {club.tags.map(
                        (tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm flex items-center gap-1"
                            >
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        )
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
                        {upcomingEvents.length >
                            0 ? (
                            upcomingEvents.map(
                                (
                                    event: Event
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

                    <div className="space-y-3">
                        {similarClubs.map(
                            (similar: any) => (
                                <Link
                                    key={similar.id}
                                    href={`/clubs/${similar.id}`}
                                    className="flex items-center justify-between py-3 px-4 bg-card border border-border rounded-lg"
                                >
                                    <div>
                                        <h4>
                                            {similar.name}
                                        </h4>

                                        <p className="text-sm text-muted-foreground">
                                            {similar.categories.join(
                                                ", "
                                            )}
                                        </p>
                                    </div>

                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {
                                            similar.members
                                        }
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}