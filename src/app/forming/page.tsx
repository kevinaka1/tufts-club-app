"use client";
import { useState } from "react";
import { Sparkles, Users, X } from "lucide-react";

import { formingClubs } from "@/data/formingClubs";
import { mockUsers } from "@/data/userProfiles";

export default function ClubsInFormation() {
    const currentUser = mockUsers[0]
    const userInterestedFormingClubs = currentUser.interestedFormingClubs

    const [interestedClubs, setInterestedClubs] = useState<Set<string>>(new Set(userInterestedFormingClubs));
    const [interestFilter, setInterestFilter] = useState<"all" | "interested" | "not-interested">("all");
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [modalAction, setModalAction] =
        useState<"express" | "undo" | null>(null);
    const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

    const handleExpressClick = (
        clubId: string
    ) => {
        setSelectedClubId(clubId);
        setModalAction("express");
        setShowInterestModal(true);
    };

    const handleUndoClick = (clubId: string) => {
        setSelectedClubId(clubId);
        setModalAction("undo");
        setShowInterestModal(true);
    };

    const confirmAction = () => {
        if (!selectedClubId) return;

        setInterestedClubs((prev) => {
            const next = new Set(prev);

            if (modalAction === "express") {
                next.add(selectedClubId);
            } else if (
                modalAction === "undo"
            ) {
                next.delete(selectedClubId);
            }

            return next;
        });

        setShowInterestModal(false);
        setSelectedClubId(null);
        setModalAction(null);
    };

    const closeModal = () => {
        setShowInterestModal(false);
        setSelectedClubId(null);
        setModalAction(null);
    };
    let filteredClubs = formingClubs;
    if (interestFilter === "interested") {
        filteredClubs = formingClubs.filter((club) => interestedClubs.has(club.id));
    } else if (interestFilter === "not-interested") {
        filteredClubs = formingClubs.filter((club) => !interestedClubs.has(club.id));
    }

    const selectedClub = selectedClubId
        ? formingClubs.find((c) => c.id === selectedClubId)
        : null;

    return (
        <div className="pb-28">
            <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground px-4 pt-6 pb-8 rounded-b-3xl">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h1>Clubs in Formation</h1>
                </div>
                <p className="opacity-90">
                    Discover new clubs looking for interested students to help them get off the ground
                </p>
            </div>

            <div className="px-4 mt-6">

                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                        {filteredClubs.length} clubs looking for interested students
                    </p>
                </div>

                <div className="mb-4 space-y-3">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setInterestFilter("all")}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${interestFilter === "all"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                                }`}
                        >
                            All Clubs
                        </button>
                        <button
                            onClick={() => setInterestFilter("interested")}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${interestFilter === "interested"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                                }`}
                        >
                            Interested
                        </button>
                        <button
                            onClick={() => setInterestFilter("not-interested")}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${interestFilter === "not-interested"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                                }`}
                        >
                            Not Interested
                        </button>
                    </div>
                </div>

                {filteredClubs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            {interestFilter === "interested"
                                ? "You haven't expressed interest in any clubs yet."
                                : "No clubs found."}
                        </p>
                    </div>
                ) : (<div className="space-y-4">
                    {filteredClubs.map((club) => {
                        const hasExpressedInterest = interestedClubs.has(club.id);
                        return (
                            <div
                                key={club.id}
                                className="bg-card border border-border rounded-2xl p-4"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex-1">
                                        <h3 className="mb-1">{club.name}</h3>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                            {club.category}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {club.description}
                                </p>

                                {hasExpressedInterest ? (
                                    <button
                                        onClick={() => handleUndoClick(club.id)}
                                        className="w-full py-3 rounded-xl bg-muted text-foreground border border-border flex items-center justify-center gap-2"
                                    >
                                        <Users className="w-4 h-4" />
                                        Interest Expressed - Undo
                                    </button>
                                ) : (<button
                                    key={club.id}
                                    onClick={() => handleExpressClick(
                                        club.id
                                    )}
                                    className="block w-full py-3 rounded-xl bg-primary text-primary-foreground text-center"
                                >
                                    Express Interest
                                </button>)}
                            </div>
                        );
                    })}
                </div>)}

                <div className="mt-8 bg-muted rounded-xl p-6 text-center">
                    <h3 className="mb-2">Want to start your own club?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Have an idea for a new club? We can help you get started and find
                        founding members.
                    </p>
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl">
                        Start a New Club
                    </button>
                </div>

                {showInterestModal && selectedClub && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-background rounded-2xl p-6 max-w-sm w-full"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3>
                                    {modalAction ===
                                        "express"
                                        ? "Express Interest?"
                                        : "Undo Interest?"}
                                </h3>

                                <button
                                    onClick={closeModal}
                                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-muted-foreground mb-6">
                                {modalAction ===
                                    "express" ? (
                                    <>
                                        Are you sure you
                                        want to express
                                        interest in{" "}
                                        <strong>
                                            {
                                                selectedClub.name
                                            }
                                        </strong>
                                        ?
                                    </>
                                ) : (
                                    <>
                                        Are you sure you
                                        want to remove
                                        your interest in{" "}
                                        <strong>
                                            {
                                                selectedClub.name
                                            }
                                        </strong>
                                        ?
                                    </>
                                )}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 py-3 bg-muted text-foreground rounded-xl"
                                >
                                    No, Go Back
                                </button>

                                <button
                                    onClick={confirmAction}
                                    className={`flex-1 py-3 rounded-xl ${modalAction ===
                                            "express"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-destructive text-destructive-foreground"
                                        }`}
                                >
                                    {modalAction ===
                                        "express"
                                        ? "Yes, I'm Interested"
                                        : "Yes, Undo"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}