"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { formingClubs } from "@/data/formingClubs";

export default function ExpressInterestForm() {
    const router = useRouter();

    const params = useParams();
    const clubId = params.id as string;

    const [isSubmitted, setIsSubmitted] =
        useState(false);

    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            classYear: "",
            email: "",
            phone: "",
        });

    const club =
        formingClubs.find(
            (club) => club.id === clubId
        );
    if (!club) {
        return (
            <div className="p-4">
                Club not found
            </div>
        );
    }

    const currentYear =
        new Date().getFullYear();

    const classYears = Array.from(
        { length: 5 },
        (_, i) => currentYear + i
    );

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    if (isSubmitted) {
        return (
            <div className="pb-28 px-4">
                <div className="flex items-center gap-4 pt-6 pb-4">
                    <button
                        onClick={() =>
                            router.push("/forming")
                        }
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <h1>
                        Interest Submitted
                    </h1>
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

                    <h2 className="mb-4">
                        Form Submitted
                    </h2>

                    <p className="text-muted-foreground mb-8">
                        Thank you{" "}
                        {formData.firstName} for
                        expressing interest in{" "}
                        {club.name}. You will
                        receive updates for next steps.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={() =>
                                router.push(
                                    "/forming"
                                )
                            }
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl"
                        >
                            Back to Forming Clubs
                        </button>

                        <button
                            onClick={() =>
                                router.push("/")
                            }
                            className="w-full py-3 bg-muted text-foreground rounded-xl"
                        >
                            Explore More Clubs
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-28 px-4">
            <div className="flex items-center gap-4 pt-6 pb-4">
                <button
                    onClick={() =>
                        router.back()
                    }
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <h1>Express Interest</h1>
            </div>

            <div className="bg-accent/50 border border-accent rounded-xl p-4 mb-6">
                <h3 className="mb-1">
                    {club.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                    Organizer:{" "}
                    {club.foundingMember}
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="firstName"
                        className="block mb-2"
                    >
                        First Name
                    </label>

                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={
                            formData.firstName
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border"
                        placeholder="Enter your first name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="lastName"
                        className="block mb-2"
                    >
                        Last Name
                    </label>

                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={
                            formData.lastName
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border"
                        placeholder="Enter your last name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="classYear"
                        className="block mb-2"
                    >
                        Class Year
                    </label>

                    <select
                        id="classYear"
                        name="classYear"
                        required
                        value={
                            formData.classYear
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border"
                    >
                        <option value="">
                            Select your class
                            year
                        </option>

                        {classYears.map(
                            (year) => (
                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2"
                    >
                        Tufts Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={
                            formData.email
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border"
                        placeholder="yourname@tufts.edu"
                        pattern=".*@tufts\.edu$"
                        title="Please enter a valid Tufts email address"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="block mb-2"
                    >
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={
                            formData.phone
                        }
                        onChange={
                            handleChange
                        }
                        className="w-full px-4 py-3 bg-input-background rounded-xl border border-border"
                        placeholder="(123) 456-7890"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground rounded-xl mt-6"
                >
                    Submit Interest
                </button>
            </form>
        </div>
    );
}