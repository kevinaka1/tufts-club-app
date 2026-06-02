import type { Club } from "@/types/club";

export const allClubs = [
  {
    id: "1",
    name: "Tufts Robotics Club",
    categories: ["Engineering", "Academic"],
    members: 45,
    description: "Build and compete with robots",
    mission:
      "Provide hands-on robotics experience while fostering teamwork and innovation.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1563968743333-044cef800494?w=200&h=200&fit=crop",
    tags: ["Engineering", "STEM", "Competition", "Hands-on"],
    meetingTime: "Thursdays, 6:00 PM - 8:00 PM",
    location: "Science & Technology Center, Room 204",
    email: "robotics@tufts.edu",
    instagram: "@tuftsrobotics",
    createdAt: new Date("2026-03-10"),
  },

  {
    id: "2",
    name: "Debate Society",
    categories: ["Academic"],
    members: 62,
    description:
      "Competitive debate and public speaking.",
    mission:
      "Develop strong communicators and critical thinkers.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=200&fit=crop",
    tags: [
      "Academic",
      "Public Speaking",
      "Competition",
    ],
    meetingTime:
      "Tuesdays & Fridays, 7:30 PM - 9:00 PM",
    location:
      "Barnum Hall, Conference Room",
    email: "debate@tufts.edu",
    instagram: "@tuftsdebate",
    createdAt: new Date("2024-02-15"),
  },

  {
    id: "3",
    name: "Photography Club",
    categories: ["Arts"],
    members: 38,
    description:
      "Capture campus life and learn photography.",
    mission:
      "Help students explore photography creatively.",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=200&fit=crop",
    tags: ["Arts", "Creative"],
    meetingTime:
      "Wednesdays, 5:00 PM - 7:00 PM",
    location: "Campus Center",
    email: "photo@tufts.edu",
    instagram: "@tuftsphoto",
    createdAt: new Date("2026-01-20"),
  },

  {
    id: "4",
    name: "Data Science Club",
    categories: ["Academic"],
    members: 51,
    description:
      "Explore data analysis and machine learning.",
    mission:
      "Teach practical data science skills.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
    tags: ["Data", "AI", "Programming"],
    meetingTime:
      "Mondays, 7:00 PM - 8:30 PM",
    location: "Halligan Hall",
    email: "datascience@tufts.edu",
    instagram: "@tuftsdatascience",
    createdAt: new Date("2025-11-02"),
  },

  {
    id: "5",
    name: "Entrepreneurship Society",
    categories: ["Professional"],
    members: 73,
    description:
      "Build startups and business skills.",
    mission:
      "Support student founders.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop",
    tags: ["Business", "Startups"],
    meetingTime:
      "Fridays, 6:00 PM - 8:00 PM",
    location: "Joyce Cummings Center",
    email: "entrepreneurship@tufts.edu",
    instagram: "@tuftsstartup",
    createdAt: new Date("2023-09-15"),
  },

  {
    id: "6",
    name: "Outdoor Adventure Club",
    categories: ["Recreation"],
    members: 89,
    description:
      "Hiking, camping, and outdoor trips.",
    mission:
      "Connect students with outdoor experiences.",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    banner:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop",
    logo:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop",
    tags: ["Outdoors", "Adventure"],
    meetingTime:
      "Weekends",
    location: "Campus Center",
    email: "outdoors@tufts.edu",
    instagram: "@tuftsoutdoors",
    createdAt: new Date("2022-06-08"),
  },
];