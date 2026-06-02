"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    MapPin,
    X
} from "lucide-react";

import { allEvents, type Event } from "@/data/events";
import { allClubs } from "@/data/clubs";
import { useSearchParams, useRouter } from "next/navigation";
import { mockUsers } from "@/data/userProfiles";

export default function EventsPage() {
    const currentUser = mockUsers[0];
    const userRSVPdEvents = currentUser.rsvpdEvents
    const currentDate: Date = new Date();

    function isToday(date: Date) {
        const today =
            currentDate;

        return (
            date.getDate() ===
            today.getDate() &&
            date.getMonth() ===
            today.getMonth() &&
            date.getFullYear() ===
            today.getFullYear()
        );
    }

    function isThisWeek(
        date: Date
    ) {
        const today =
            currentDate;

        const weekFromNow =
            currentDate;

        weekFromNow.setDate(
            today.getDate() +
            7
        );

        return (
            date > today &&
            date <=
            weekFromNow &&
            !isToday(date)
        );
    }
    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const initialTab =
        searchParams.get(
            "tab"
        ) === "campus"
            ? "campus"
            : "club";
    const [activeTab, setActiveTab] =
        useState<
            "club" | "campus"
        >(initialTab);
    const [rsvpedEvents, setRsvpedEvents] = useState<Set<string>>(new Set(userRSVPdEvents));
    const [showRsvpModal, setShowRsvpModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [rsvpFilter, setRsvpFilter] = useState<"all" | "rsvped" | "not-rsvped">("all");
    const [hideExpiredRsvp, setHideExpiredRsvp] = useState(false);


    const isRsvpExpired = (event: Event) => {
        if (!event.rsvpDeadline) return false;
        return currentDate > event.rsvpDeadline;
    };

    let filteredEvents = allEvents.filter((event) => {
        if (activeTab === "campus") {
            return event.type === "campus";
        }

        return (
            event.type === "club" &&
            event.clubId &&
            currentUser.followedClubs.includes(event.clubId)
        );
    });

    // Filter campus events by RSVP status
    if (activeTab === "campus" && rsvpFilter !== "all") {
        filteredEvents = filteredEvents.filter((event) => {
            const isEventRsvped = rsvpedEvents.has(event.id);
            return rsvpFilter === "rsvped" ? isEventRsvped : !isEventRsvped;
        });
    }

    // Filter out expired RSVP events if hideExpiredRsvp is true
    if (activeTab === "campus" && hideExpiredRsvp) {
        filteredEvents = filteredEvents.filter((event) => !isRsvpExpired(event));
    }




    const handleRsvpClick = (eventId: string) => {
        setSelectedEventId(eventId);
        setShowRsvpModal(true);
    };

    const confirmRsvp = () => {
        if (selectedEventId) {
            setRsvpedEvents((prev) => {
                const next = new Set(prev);
                if (next.has(selectedEventId)) {
                    next.delete(selectedEventId);
                } else {
                    next.add(selectedEventId);
                }
                return next;
            });
        }
        setShowRsvpModal(false);
        setSelectedEventId(null);
    };

    const cancelRsvpModal = () => {
        setShowRsvpModal(false);
        setSelectedEventId(null);
    };

    const isRsvped = (eventId: string) => rsvpedEvents.has(eventId);

    const handleTabChange = (
        tab: "club" | "campus"
    ) => {
        setActiveTab(tab);

        router.replace(
            `/events?tab=${tab}`
        );
    };


    const sortedEvents = [...filteredEvents].sort(
        (a, b) =>
            a.startDate.getTime() -
            b.startDate.getTime()
    );

    const todayEvents =
        sortedEvents.filter(
            (event) =>
                isToday(
                    event.startDate
                )
        );

    const thisWeekEvents =
        sortedEvents.filter(
            (event) =>
                isThisWeek(
                    event.startDate
                )
        );

    const laterEvents =
        sortedEvents.filter(
            (event) =>
                !isToday(
                    event.startDate
                ) &&
                !isThisWeek(
                    event.startDate
                )
        );

    const renderSection = (
        title: string,
        events: typeof sortedEvents
    ) => {
        if (
            events.length ===
            0
        )
            return null;


        return (
            <section className="mb-8">
                <h2 className="mb-3 text-muted-foreground">
                    {title}
                </h2>

                <div className="space-y-4">
                    {events.map(
                        (
                            event
                        ) => {
                            const club =
                                event.clubId
                                    ? allClubs.find(
                                        (
                                            c
                                        ) =>
                                            c.id ===
                                            event.clubId
                                    )
                                    : null;
                            const buttonClass = isRsvped(event.id)
                                ? "bg-muted text-foreground border border-border"
                                : event.rsvpDeadline && currentDate > event.rsvpDeadline
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-primary text-primary-foreground";

                            return (
                                <div
                                    key={
                                        event.id
                                    }
                                    className="bg-card border border-border rounded-2xl overflow-hidden"
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={
                                                event.image
                                            }
                                            alt={
                                                event.name
                                            }
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="mb-2">
                                            {
                                                event.name
                                            }
                                        </h3>

                                        {event.type ===
                                            "club" &&
                                            club && (
                                                <Link
                                                    href={`/clubs/${club.id}`}
                                                    className="text-sm text-primary mb-2 inline-block"
                                                >
                                                    {
                                                        club.name
                                                    }
                                                </Link>
                                            )}

                                        {event.type ===
                                            "campus" &&
                                            event.organizer && (
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Organized
                                                    by{" "}
                                                    {
                                                        event.organizer
                                                    }
                                                </p>
                                            )}

                                        <p className="text-sm text-muted-foreground mb-4">
                                            {
                                                event.description
                                            }
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-primary" />

                                                <span>
                                                    {event.startDate.toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday:
                                                                "short",
                                                            month:
                                                                "short",
                                                            day:
                                                                "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="w-4 h-4 text-primary" />

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

                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-4 h-4 text-primary" />

                                                <span>
                                                    {
                                                        event.location
                                                    }
                                                </span>
                                            </div>
                                        </div>


                                        {event.type ===
                                            "campus" && (
                                                <div className="mt-4">
                                                    <button
                                                        disabled={
                                                            event.rsvpDeadline
                                                                ? currentDate >
                                                                event.rsvpDeadline
                                                                : false
                                                        }
                                                        onClick={() => handleRsvpClick(event.id)}

                                                        className={`w-full py-3 rounded-xl transition-colors ${buttonClass}`}
                                                    >
                                                        {isRsvped(event.id) ? "Cancel RSVP" :
                                                            event.rsvpDeadline &&
                                                                currentDate >
                                                                event.rsvpDeadline
                                                                ? "Unable to RSVP"
                                                                : "RSVP to Event"}
                                                    </button>

                                                    {event.rsvpDeadline && (
                                                        <p className="text-xs text-muted-foreground text-center mt-2">
                                                            RSVP by{" "}
                                                            {event.rsvpDeadline.toLocaleString(
                                                                "en-US",
                                                                {
                                                                    month:
                                                                        "short",
                                                                    day:
                                                                        "numeric",
                                                                    year: "numeric",
                                                                    hour:
                                                                        "numeric",
                                                                    minute:
                                                                        "2-digit",
                                                                }
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>

                {
                    showRsvpModal && selectedEventId && (
                        <div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={cancelRsvpModal}
                        >
                            <div
                                className="bg-background rounded-2xl p-6 max-w-sm w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <h3>
                                        {isRsvped(selectedEventId) ? "Cancel RSVP?" : "Confirm RSVP?"}
                                    </h3>
                                    <button
                                        onClick={cancelRsvpModal}
                                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-muted-foreground mb-6">
                                    {isRsvped(selectedEventId)
                                        ? "Are you sure you want to cancel your RSVP for this event?"
                                        : "Are you sure you want to RSVP to this event?"}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={cancelRsvpModal}
                                        className="flex-1 py-3 bg-muted text-foreground rounded-xl"
                                    >
                                        No, Go Back
                                    </button>
                                    <button
                                        onClick={confirmRsvp}
                                        className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl"
                                    >
                                        Yes, {isRsvped(selectedEventId) ? "Cancel" : "Confirm"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section >
        );
    };


    return (
        <div className="pb-24">
            <div className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
                <h1 className="mb-4">
                    Events
                </h1>

                <div className="flex gap-2 bg-white/10 rounded-xl p-1">
                    <button
                        onClick={() => {
                            handleTabChange(
                                "club"
                            )
                            setRsvpFilter("all");
                        }}
                        className={`flex-1 py-2 rounded-lg transition-colors ${activeTab ===
                            "club"
                            ? "bg-white text-primary"
                            : "text-primary-foreground"
                            }`}
                    >
                        Club Events
                    </button>

                    <button
                        onClick={() => {
                            handleTabChange(
                                "campus"
                            )
                            setRsvpFilter("all");
                        }}
                        className={`flex-1 py-2 rounded-lg transition-colors ${activeTab ===
                            "campus"
                            ? "bg-white text-primary"
                            : "text-primary-foreground"
                            }`}
                    >
                        Campus Events
                    </button>
                </div>
            </div>

            <div className="px-4 mt-4">
                {activeTab ===
                    "club" && (
                        <p className="text-sm text-muted-foreground mb-4">
                            Events from clubs
                            you follow
                        </p>
                    )}
                {activeTab === "campus" && (
                    <div className="mb-4 space-y-3">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => setRsvpFilter("all")}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${rsvpFilter === "all"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                    }`}
                            >
                                All Events
                            </button>
                            <button
                                onClick={() => setRsvpFilter("rsvped")}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${rsvpFilter === "rsvped"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                    }`}
                            >
                                RSVPed
                            </button>
                            <button
                                onClick={() => setRsvpFilter("not-rsvped")}
                                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${rsvpFilter === "not-rsvped"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                    }`}
                            >
                                Not RSVPed
                            </button>
                        </div>
                        <button
                            onClick={() => setHideExpiredRsvp(!hideExpiredRsvp)}
                            className="text-sm text-primary"
                        >
                            {hideExpiredRsvp
                                ? "Show events with expired RSVP deadlines"
                                : "Hide events with expired RSVP deadlines"}
                        </button>
                    </div>
                )}

                <div className="px-4 mt-4">
                    {renderSection(
                        "Today",
                        todayEvents
                    )}

                    {renderSection(
                        "This Week",
                        thisWeekEvents
                    )}

                    {renderSection(
                        "Later",
                        laterEvents
                    )}
                </div>
            </div>
        </div>
    );
}