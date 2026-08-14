"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, GraduationCap, Check } from "lucide-react";
import Image from "next/image";

const CURRENT_YEAR = 2026;
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR + i);

const steps = [
    { id: "year" },
    { id: "categories" },
    { id: "clubs" },
    { id: "done" },
];

export default function Onboarding() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [gradYear, setGradYear] = useState("");
    const [yearError, setYearError] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (step === 0 && !gradYear) {
            setYearError("Please select your graduation year.");
            return;
        }
        setYearError("");
        if (step < steps.length - 1) setStep((s) => s + 1);
    }

    const handleBack = () => {
        if (step > 0) setStep((s) => s - 1);
    }

    const handleFinish = async () => {
        setError(null);
        setIsLoading(true);
        try {
            console.log("Can you see this?")
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    graduationYear: gradYear,
                }),
            });

            console.log("Hello")

            const { data, error } = await response.json();

            if (!response.ok) {
                throw new Error(
                    `Request failed: ${response.status} - ${JSON.stringify(error)}`
                );
            }
            console.log("User data")
            console.log(data)

            router.push("/");
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("Something went wrong. Please try again.")
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className=" bg-background flex flex-col items-center justify-between px-6 py-10 max-w-lg mx-auto">
            {/* Top: logo + progress */}
            <div className="w-full flex flex-col items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Step dots */}
                <div className="flex items-center gap-2">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`rounded-full transition-all duration-300 ${i === step
                                ? "w-6 h-2 bg-primary"
                                : i < step
                                    ? "w-2 h-2 bg-primary/40"
                                    : "w-2 h-2 bg-border"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Step content */}
            <div className="w-full flex flex-col items-center gap-6 flex-1 justify-center py-8">

                {/* Step 0 — Graduation year */}
                {step === 0 && (
                    <div className="w-full flex flex-col items-center gap-6 animate-slide-up">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-foreground">Welcome to Tufts Clubs</h2>
                            <p className="text-sm text-muted-foreground mt-1">Let&apos;s get your profile set up.</p>
                        </div>

                        <div className="w-full flex flex-col gap-2">
                            <label className="text-sm font-medium text-foreground">
                                What year do you graduate?
                            </label>
                            <div className="relative">
                                <select
                                    value={gradYear}
                                    onChange={(e) => {
                                        setGradYear(e.target.value);
                                        setYearError("");
                                    }}
                                    className={`w-full appearance-none rounded-xl bg-input-background border px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition cursor-pointer ${yearError ? "border-destructive" : "border-border"
                                        } ${!gradYear ? "text-muted-foreground" : ""}`}
                                >
                                    <option value="" disabled>Select graduation year</option>
                                    {YEARS.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                {/* Custom chevron */}
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            {yearError && (
                                <p className="text-xs text-destructive">{yearError}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 1 — How to like a category */}
                {step === 1 && (
                    <div className="w-full flex flex-col items-center gap-5 animate-slide-up">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-foreground">Discover what you love</h2>
                            <p className="text-sm text-muted-foreground mt-1">Like categories to personalize your feed.</p>
                        </div>

                        {/* Blank canvas */}
                        <div className="w-full rounded-2xl bg-muted/40 flex items-center justify-center">
                            <Image
                                src="/img/Follow_Club_Onboarding.png"
                                alt="how to follow clubs image"
                                width={2874}
                                height={1126}
                            />
                        </div>

                        {/* Caption */}
                        <div className="w-full bg-accent rounded-xl px-4 py-3">
                            <p className="text-sm text-accent-foreground text-center leading-relaxed">
                                <span className="font-semibold"></span> Tap the heart icon next to any category to like it. This is how you personalize your club recommendations.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2 — How to follow a club */}
                {step === 2 && (
                    <div className="w-full flex flex-col items-center gap-5 animate-slide-up">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-foreground">Follow your clubs</h2>
                            <p className="text-sm text-muted-foreground mt-1">Stay updated on meetings and events.</p>
                        </div>

                        {/* Blank canvas */}
                        <div className="w-full rounded-2xl bg-muted/40 flex flex-col items-center justify-center gap-2">
                            <Image
                                src="/img/Like_Category_Onboarding.png"
                                alt="how to like categories image"
                                width={2880}
                                height={724}
                            />
                        </div>

                        {/* Caption */}
                        <div className="w-full bg-accent rounded-xl px-4 py-3">
                            <p className="text-sm text-accent-foreground text-center leading-relaxed">
                                <span className="font-semibold"></span> Tap <span className="font-semibold">Join or the heart icon</span> on any club page to add it to your profile and get notified about their upcoming events.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 3 — All done */}
                {step === 3 && (
                    <div className="w-full flex flex-col items-center gap-5 animate-slide-up">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-foreground">You&apos;re all set!</h2>
                            <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">
                                Start exploring clubs, follow your favorites, and never miss an event.
                            </p>
                        </div>
                        {gradYear && (
                            <div className="bg-muted rounded-xl px-5 py-3 text-sm text-muted-foreground">
                                Class of <span className="font-semibold text-foreground">{gradYear}</span> — welcome to the community!
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom navigation */}
            <div className="w-full flex flex-col gap-3">
                {step < steps.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition flex items-center justify-center gap-1.5"
                    >
                        Continue
                        <ChevronRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleFinish}
                        disabled={isLoading}
                        className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition"
                    >
                        {isLoading ? "Saving..." : "Finish Onboarding"}
                    </button>
                )}

                {step > 0 && (
                    <button
                        onClick={handleBack}
                        className="w-full rounded-xl border border-border bg-background text-foreground py-3 text-sm font-medium hover:bg-muted/50 active:scale-[0.98] transition flex items-center justify-center gap-1.5"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                )}

                {error && (
                    <p className="text-sm  text-destructive">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}