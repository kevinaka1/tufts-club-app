"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Grid3x3, List as ListIcon, Users, Filter, Heart } from "lucide-react";
import { ClubsDirectoryClub } from "@/types/apiResponses";
import { CategoryType } from "@/types/category";


export function ClubsDirectory({
    userId,
    allClubs,
    usersLikedCategories,
    categories
}: {
    userId: string,
    allClubs: ClubsDirectoryClub[] | undefined,
    usersLikedCategories: CategoryType[],
    categories: CategoryType[] | undefined
}) {

    const SIX_MONTHS =
        1000 * 60 * 60 * 24 * 30 * 6;
    const currentDate = Date.now()
    const isNew = (clubCreationDate: Date) => (currentDate - clubCreationDate.getTime() < SIX_MONTHS)



    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [likedCategories, setLikedCategories] = useState<Set<string>>(
        new Set(usersLikedCategories.map(category => category.id))
    );

    const toggleLikeCategory = async (categoryId: string) => {

        const wasLiked = likedCategories.has(categoryId)

        setLikedCategories((prev) => {
            const next = new Set(prev);

            if (wasLiked) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }

            return next;
        });

        try {
            let response;
            if (wasLiked) {
                response = await fetch("/api/userLikedCategories", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        categoryId: categoryId,
                    }),
                });
            } else {
                response = await fetch("/api/userLikedCategories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        categoryId: categoryId,
                    }),
                });
            }

            if (!response.ok) {
                throw new Error("Request failed");
            }
        } catch (err) {
            console.error(err);

            setLikedCategories(prev => {
                const next = new Set(prev);

                if (wasLiked) {
                    next.add(categoryId);
                } else {
                    next.delete(categoryId);
                }

                return next;
            });
        }
    };

    const filteredClubs = allClubs?.filter((club) => {
        const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            club.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some((categoryId) =>
                club.categories.some(
                    (category) => category.id === categoryId
                )
            );
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pb-28">
            <div className="bg-primary text-primary-foreground px-4 pt-6 pb-6">
                <div className="flex items-center justify-between mb-4">
                    <h1>All Clubs</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-white/20" : "bg-transparent"
                                }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-white/20" : "bg-transparent"
                                }`}
                        >
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search clubs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-foreground"
                        />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 space-y-3">
                        <div>
                            <label className="text-sm mb-2 block opacity-90">Category</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {categories?.map((category) => {
                                    const isLiked = likedCategories.has(category.id);
                                    return (
                                        <div
                                            key={category.id}
                                            className="flex items-center gap-1 bg-white/10 rounded-full"
                                        >

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleLikeCategory(category.id);
                                                }}
                                                className="pl-2 py-1"
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isLiked
                                                        ? "fill-current text-red-400"
                                                        : "text-white/60"
                                                        }`}
                                                />
                                            </button>

                                            <button
                                                key={category.id}
                                                onClick={() => {
                                                    setSelectedCategories((prev) =>
                                                        prev.includes(category.id)
                                                            ? prev.filter((c) => c !== category.id) // deselect
                                                            : [...prev, category.id] // select
                                                    );
                                                }}
                                                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap appearance-none ${selectedCategories.includes(category.id)
                                                    ? "bg-white text-primary"
                                                    : "bg-white/10 text-primary-foreground"
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="px-4 mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                    {filteredClubs?.length} {filteredClubs?.length === 1 ? "club" : "clubs"} found
                </p>

                {viewMode === "grid" ? (

                    <div key={"list"} className="grid grid-cols-2 gap-3">
                        {filteredClubs?.map((club) => {
                            return (
                                <Link key={club.id} href={`/clubs/${club.id}`}>
                                    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
                                        <div className="relative h-36">
                                            <img
                                                src={club.image}
                                                alt={club.name}
                                                className="w-full h-full object-cover"
                                            />


                                            {isNew(club.createdAt) && (
                                                <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                                                    New
                                                </span>
                                            )}

                                        </div>

                                        <div className="p-3">
                                            <h3 className="mb-1">
                                                {club.name}
                                            </h3>

                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div>
                                                    {club.categories.map(
                                                        (category, index) => (
                                                            <span
                                                                key={category.id}
                                                                className="text-sm text-muted-foreground"
                                                            >
                                                                {category.name}
                                                                {index < club.categories.length - 1 && ", "}
                                                            </span>
                                                        )
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
                        })}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredClubs?.map((club) => (
                            <Link
                                key={club.id}
                                href={`/clubs/${club.id}`}
                                className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl"
                            >
                                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                                    <img
                                        src={club.image}
                                        alt={club.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="mb-1">
                                        {club.name}
                                    </h4>

                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                        {
                                            club.description
                                        }
                                    </p>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <span>
                                            {club.categories
                                                .map((category) => category.name)
                                                .join(", ")}
                                        </span>

                                        <span>•</span>

                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {
                                                club.members
                                            }
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}