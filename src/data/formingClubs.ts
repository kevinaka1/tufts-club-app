export type FormingClub = {
    id: string;
    name: string;
    category: string;
    description: string;
    foundingMember: string;
};

export const formingClubs: FormingClub[] = [
    {
        id: "f1",
        name: "Quantum Computing Club",
        category: "Academic",
        description:
            "Exploring the cutting edge of quantum computing and its applications. Looking for students interested in physics, computer science, and mathematics.",
        foundingMember: "Dr. Sarah Chen",
    },
    {
        id: "f2",
        name: "Sustainable Fashion Collective",
        category: "Environmental",
        description:
            "Creating a community around sustainable and ethical fashion. We'll host clothing swaps, upcycling workshops, and discussions on fashion industry impacts.",
        foundingMember: "Maya Patel",
    },
    {
        id: "f3",
        name: "Esports Team",
        category: "Gaming",
        description:
            "Competitive gaming across multiple titles. Planning to compete in collegiate esports tournaments and build a supportive gaming community on campus.",
        foundingMember: "Alex Johnson",
    },
    {
        id: "f4",
        name: "Mental Health Advocacy",
        category: "Wellness",
        description:
            "Breaking stigma around mental health through peer support, educational events, and campus advocacy. Creating a safe space for open conversations.",
        foundingMember: "Jordan Williams",
    },
    {
        id: "f5",
        name: "Urban Gardening Initiative",
        category: "Environmental",
        description:
            "Building community gardens around campus. Growing fresh produce, learning sustainable agriculture, and connecting with nature.",
        foundingMember: "Taylor Martinez",
    },
    {
        id: "f6",
        name: "Film Production Studio",
        category: "Arts",
        description:
            "Creating original short films, documentaries, and video content. Open to all skill levels — from directors to actors to editors.",
        foundingMember: "Chris Anderson",
    },
];