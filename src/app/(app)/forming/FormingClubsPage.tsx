"use client";
import { useState } from "react";
import { Sparkles, Users, X } from "lucide-react";
import { FormingClubResponse } from "@/types/apiResponses";
import { useRouter } from "next/navigation";



export default function ClubsInFormation({
    formingClubs,
    initialInterestedClubIds,

}: {
    formingClubs: FormingClubResponse[],
    initialInterestedClubIds: string[] | undefined
}) {
    const router = useRouter();
    const [interestedClubs, setInterestedClubs] =
        useState(
            new Set(initialInterestedClubIds)
        );

    const [interestFilter, setInterestFilter] = useState<"all" | "interested" | "not-interested">("all");
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [modalAction, setModalAction] =
        useState<"express" | "undo" | null>(null);
    const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    const confirmAction = async () => {
        if (!selectedClubId) return;

        setInterestedClubs((prev) => {
            const next = new Set(prev);

            if (modalAction === "express") {
                next.add(selectedClubId);
            } else if (modalAction === "undo") {
                next.delete(selectedClubId);
            }

            return next;
        });

        try {
            let response;
            if (modalAction === "express") {
                response = await fetch("/api/userInterestedFormingClubs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        formingClubId: selectedClubId,
                    }),
                });
            } else if (modalAction === "undo") {
                response = await fetch("/api/userInterestedFormingClubs", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        formingClubId: selectedClubId,
                    }),
                });
            }

            if (!response?.ok) {
                throw new Error("Request failed");
            }
        } catch (err) {
            console.error(err);

            setInterestedClubs((prev) => {
                const next = new Set(prev);

                if (modalAction === "express") {
                    next.delete(selectedClubId);
                } else if (modalAction === "undo") {
                    next.add(selectedClubId);
                }

                return next;
            });
        }


        setIsSubmitted(true);
        setShowInterestModal(false);
        setSelectedClubId(null);
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
        <div className="min-h-[calc(100vh-4rem)] flex flex-col pb-20">
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

            <div className="flex-1 flex flex-col px-4 mt-6">

                <div className="mb-4">

                    <p className="text-sm text-muted-foreground">
                        {interestFilter === "all" && filteredClubs.length > 0
                            ? `${filteredClubs.length} clubs looking for interested students`
                            : "\u00A0"}
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
                    {filteredClubs.map((formingClub) => {
                        const hasExpressedInterest = interestedClubs.has(formingClub.id);
                        return (
                            <div
                                key={formingClub.id}
                                className="bg-card border border-border rounded-2xl p-4"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex-1">
                                        <h3 className="mb-1">{formingClub.name}</h3>
                                        {formingClub.categories.map((formingClubCategory) => {
                                            return (
                                                <span key={formingClubCategory.id} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                                    {formingClubCategory.name}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {formingClub.description}
                                </p>

                                {hasExpressedInterest ? (
                                    <button
                                        onClick={() => handleUndoClick(formingClub.id)}
                                        className="w-full py-3 rounded-xl bg-muted text-foreground border border-border flex items-center justify-center gap-2"
                                    >
                                        <Users className="w-4 h-4" />
                                        Interest Expressed - Undo
                                    </button>
                                ) : (<button
                                    key={formingClub.id}
                                    onClick={() => handleExpressClick(
                                        formingClub.id
                                    )}
                                    className="block w-full py-3 rounded-xl bg-primary text-primary-foreground text-center"
                                >
                                    Express Interest
                                </button>)}
                            </div>
                        );
                    })}
                </div>)}

                <div className="mt-auto pt-4">
                    <div className="bg-muted rounded-xl p-6 text-center">
                        <h3 className="mb-2">Want to start your own club?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Have an idea for a new club? We can help you get started and find
                            founding members.
                        </p>
                        <a
                            href="https://students.tufts.edu/office-campus-life/student-orgs/starting-new-organization"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary"
                        >
                            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl">
                                Start a New Club
                            </button>
                        </a>
                    </div>
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

                {isSubmitted && modalAction &&
                    (
                        <div className="fixed inset-0 bg-background pb-4 px-4 lex items-center justify-center">
                            <div className="flex items-center gap-4 pt-6 pb-4">

                            </div>

                            <div className="mt-8 text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-10 h-10 text-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                {modalAction === "express" &&
                                    (<> <h2 className="mb-4">Interest Expressed</h2>
                                        <p className="text-muted-foreground mb-8">
                                            Thank you for expressing interest in this club!
                                            You will be contacted by our founding member for ways you can get involved.
                                        </p> </>)
                                }
                                {modalAction === "undo" &&
                                    (<> <h2 className="mb-4">Interest Undone</h2>
                                        <p className="text-muted-foreground mb-8">
                                            We're sorry to see you go!
                                            You will no longer be contacted by our founding member for ways you can get involved.
                                        </p> </>)
                                }

                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setModalAction(null);
                                            router.push("/forming");
                                        }}

                                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl"
                                    >
                                        Back to Forming Clubs
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setModalAction(null);
                                            router.push("/");
                                        }}
                                        className="w-full py-3 bg-muted text-foreground rounded-xl"
                                    >
                                        Explore More Clubs
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}