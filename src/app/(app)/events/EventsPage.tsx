"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    MapPin,
    X
} from "lucide-react";


import { useSearchParams, useRouter } from "next/navigation";
import { CampusEvent, CampusEventSections, ClubEventSections } from "@/types/apiResponses";
import { ClubEvent } from "@/types/apiResponses";

export default function EventsPage({
    initialRSVPdEventIds,
    clubEvents,
    campusEvents
}: {
    initialRSVPdEventIds: string[] | undefined,
    clubEvents: ClubEventSections,
    campusEvents: CampusEventSections
}) {

    const searchParams =
        useSearchParams();

    const router =
        useRouter();

    const initialRsvped = initialRSVPdEventIds;

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

    const [rsvpedEvents, setRsvpedEvents] = useState<Set<string>>(new Set(initialRsvped));
    const [showRsvpModal, setShowRsvpModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [rsvpFilter, setRsvpFilter] = useState<"all" | "rsvped" | "not-rsvped">("all");
    const [hideExpiredRsvp, setHideExpiredRsvp] = useState(false);

    const isRsvped = (eventId: string) => rsvpedEvents.has(eventId);
    const currentDate = new Date();

    function isExpired(deadline?: Date) {
        if (!deadline) return false;
        return currentDate > deadline;
    }



    const filteredCampusSection =
    {
        todayEvents: campusEvents?.todayEvents.filter(event => {
            if (
                rsvpFilter === "rsvped" &&
                !isRsvped(event.id)
            )
                return false;

            if (
                rsvpFilter === "not-rsvped" &&
                isRsvped(event.id)
            )
                return false;

            if (
                hideExpiredRsvp &&
                isExpired(event.rsvpDeadline)
            )
                return false;

            return true;
        }),

        thisWeekEvents: campusEvents?.thisWeekEvents.filter(event => {
            if (
                rsvpFilter === "rsvped" &&
                !isRsvped(event.id)
            )
                return false;

            if (
                rsvpFilter === "not-rsvped" &&
                isRsvped(event.id)
            )
                return false;

            if (
                hideExpiredRsvp &&
                isExpired(event.rsvpDeadline)
            )
                return false;

            return true;


        }),

        laterEvents: campusEvents?.laterEvents.filter(event => {
            if (
                rsvpFilter === "rsvped" &&
                !isRsvped(event.id)
            )
                return false;

            if (
                rsvpFilter === "not-rsvped" &&
                isRsvped(event.id)
            )
                return false;

            if (
                hideExpiredRsvp &&
                isExpired(event.rsvpDeadline)
            )
                return false;

            return true;
        }),
    };





    const handleRsvpClick = (eventId: string) => {
        setSelectedEventId(eventId);
        setShowRsvpModal(true);
    };

    const confirmRsvp = async () => {
        if (!selectedEventId) return;

        const wasRsvped = rsvpedEvents.has(selectedEventId);

        setRsvpedEvents(prev => {
            const next = new Set(prev);

            if (wasRsvped) {
                next.delete(selectedEventId);
            } else {
                next.add(selectedEventId);
            }

            return next;
        });

        try {
            let response;
            if (wasRsvped) {
                response = await fetch("/api/rsvp", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId: selectedEventId,
                    }),
                });
            } else {
                response = await fetch("/api/rsvp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId: selectedEventId,
                    }),
                });
            }

            if (!response.ok) {
                throw new Error("Request failed");
            }
        } catch (err) {
            console.error(err);

            setRsvpedEvents(prev => {
                const next = new Set(prev);

                if (wasRsvped) {
                    next.add(selectedEventId);
                } else {
                    next.delete(selectedEventId);
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



    const handleTabChange = (
        tab: "club" | "campus"
    ) => {
        setActiveTab(tab);

        router.replace(
            `/events?tab=${tab}`
        );
    };

    const renderClubSection = (
        title: string,
        events: ClubEvent[]
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

                                        {event.club?.name && event.club.id && (
                                            <Link
                                                href={`/clubs/${event.club.id}`}
                                                className="text-sm text-primary mb-2 inline-block"
                                            >
                                                {
                                                    event.club.name
                                                }
                                            </Link>
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
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>


            </section >
        )
    }

    const anyCampusEvents = filteredCampusSection.todayEvents.length > 0 ||
        filteredCampusSection.thisWeekEvents.length > 0 ||
        filteredCampusSection.laterEvents.length > 0

    const anyClubEvents = clubEvents.todayEvents.length > 0 ||
        clubEvents.thisWeekEvents.length > 0 ||
        clubEvents.laterEvents.length > 0


    const renderCampusSection = (
        title: string,
        events: CampusEvent[]
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

                            const buttonClass = isRsvped(event.id)
                                ? "bg-muted text-foreground border border-border"
                                : event.rsvpDeadline && isExpired(event.rsvpDeadline)
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



                                        {event.organizer && (
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



                                        <div className="mt-4">
                                            <button
                                                disabled={
                                                    isExpired(event.rsvpDeadline)
                                                }
                                                onClick={() => handleRsvpClick(event.id)}

                                                className={`w-full py-3 rounded-xl transition-colors ${buttonClass}`}
                                            >
                                                {isRsvped(event.id) ? "Cancel RSVP" :
                                                    event.rsvpDeadline &&
                                                        isExpired(event.rsvpDeadline)
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
        )
    }

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
                    </div>
                )}

                {activeTab === "campus" && anyCampusEvents &&
                    (
                        <>
                            <button
                                onClick={() => setHideExpiredRsvp(!hideExpiredRsvp)}
                                className="text-sm text-primary"
                            >
                                {hideExpiredRsvp
                                    ? "Show events with expired RSVP deadlines"
                                    : "Hide events with expired RSVP deadlines"}
                            </button>

                            <div className="px-4 mt-4">
                                {renderCampusSection(
                                    "Today",
                                    filteredCampusSection.todayEvents
                                )}


                                {renderCampusSection(
                                    "This Week",
                                    filteredCampusSection.thisWeekEvents
                                )}

                                {renderCampusSection(
                                    "Later",
                                    filteredCampusSection.laterEvents
                                )}
                            </div>
                        </>
                    )}

                {activeTab == "campus" && !anyCampusEvents && ((<p className="text-sm text-muted-foreground mb-4">
                    There are no upcoming events on campus currently  Wait for more!.</p>))}

                {activeTab === "club" && anyClubEvents && (
                    <>
                        <p className="text-sm text-muted-foreground mb-4">
                            Events from clubs
                            you follow
                        </p>

                        <div className="px-4 mt-4">
                            {renderClubSection(
                                "Today",
                                clubEvents.todayEvents
                            )}



                            {renderClubSection(
                                "This Week",
                                clubEvents.thisWeekEvents
                            )}

                            {renderClubSection(
                                "Later",
                                clubEvents.laterEvents
                            )}
                        </div>
                    </>
                )}

                {activeTab == "club" && !anyClubEvents && ((<p className="text-sm text-muted-foreground mb-4">
                    There are currently no upcoming events for the clubs that you follow.</p>))}




            </div>
        </div>
    );

};


