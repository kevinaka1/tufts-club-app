"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    List,
    Calendar,
    Sparkles,
    User,
} from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        {
            path: "/explore",
            icon: Home,
            label: "Explore",
        },
        {
            path: "/clubs",
            icon: List,
            label: "Clubs",
        },
        {
            path: "/events",
            icon: Calendar,
            label: "Events",
        },
        {
            path: "/forming",
            icon: Sparkles,
            label: "Formation",
        },
        {
            path: "/profile",
            icon: User,
            label: "Profile",
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-background">
            <div className="flex justify-around items-center h-full">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.path ||
                        (
                            item.path !==
                            "/explore" &&
                            pathname.startsWith(
                                item.path
                            )
                        );

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-all duration-200`}
                        >
                            <div
                                className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />

                                <span className="text-[10px]">
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}