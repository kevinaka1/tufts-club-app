export type Event = {
  id: string;
  type: "club" | "campus";
  clubId?: string;
  organizer?: string;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  rsvpDeadline?: Date;
  image: string;
};

export const allEvents: Event[] = [
  // CLUB EVENTS

  {
    id: "e1",
    type: "club",
    clubId: "1",
    name: "Robotics GIM",
    description:
      "Meet the team and learn about robotics competitions this semester.",
    location:
      "Science & Technology Center, Room 204",
    startDate: new Date(
      "2026-09-15T18:00:00"
    ),
    endDate: new Date(
      "2026-09-15T20:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  },

  {
    id: "e2",
    type: "club",
    clubId: "1",
    name:
      "Weekly Robotics Build Session",
    description:
      "Hands-on robot building and programming.",
    location:
      "Science & Technology Center, Lab 2",
    startDate: new Date(
      "2026-09-21T18:00:00"
    ),
    endDate: new Date(
      "2026-09-21T20:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop",
  },

  {
    id: "e3",
    type: "club",
    clubId: "2",
    name:
      "Debate Society GIM",
    description:
      "Come meet the debate team and try mock debates.",
    location:
      "Barnum Hall, Conference Room",
    startDate: new Date(
      "2026-09-18T19:00:00"
    ),
    endDate: new Date(
      "2026-09-18T21:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
  },

  {
    id: "e4",
    type: "club",
    clubId: "3",
    name:
      "Photography Golden Hour Walk",
    description:
      "Campus photo walk during sunset.",
    location:
      "Academic Quad",
    startDate: new Date(
      "2026-09-23T17:30:00"
    ),
    endDate: new Date(
      "2026-09-23T19:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop",
  },

  {
    id: "e5",
    type: "club",
    clubId: "4",
    name:
      "Data Science Resume Workshop",
    description:
      "Learn how to prepare for internships and technical interviews.",
    location:
      "Halligan Hall, Room 120",
    startDate: new Date(
      "2026-09-28T18:30:00"
    ),
    endDate: new Date(
      "2026-09-28T20:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  },

  {
    id: "e6",
    type: "club",
    clubId: "5",
    name:
      "Entrepreneurship Startup Pitch Night",
    description:
      "Pitch your startup idea and get feedback.",
    location:
      "Joyce Cummings Center",
    startDate: new Date(
      "2026-10-02T19:00:00"
    ),
    endDate: new Date(
      "2026-10-02T21:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
  },

  {
    id: "e7",
    type: "club",
    clubId: "6",
    name:
      "Outdoor Adventure Fall Hike",
    description:
      "Weekend hiking trip for all experience levels.",
    location:
      "Blue Hills Reservation",
    startDate: new Date(
      "2026-10-05T08:00:00"
    ),
    endDate: new Date(
      "2026-10-05T14:00:00"
    ),
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop",
  },

  // CAMPUS EVENTS

  {
    id: "e8",
    type: "campus",
    organizer:
      "Student Activities",
    name: "Bingo Night",
    description:
      "Win prizes, enjoy snacks, and hang out with friends.",
    location:
      "Campus Center Ballroom",
    startDate: new Date(
      "2026-09-19T20:00:00"
    ),
    endDate: new Date(
      "2026-09-19T22:00:00"
    ),
    rsvpDeadline:
      new Date(
        "2026-09-19T16:00:00"
      ),
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=400&fit=crop",
  },

  {
    id: "e9",
    type: "campus",
    organizer:
      "Student Theater Program",
    name:
      "Student Theater Showcase",
    description:
      "Watch performances from student theater groups.",
    location:
      "Balch Arena Theater",
    startDate: new Date(
      "2026-10-08T19:30:00"
    ),
    endDate: new Date(
      "2026-10-08T22:00:00"
    ),
    rsvpDeadline:
      new Date(
        "2026-10-08T12:00:00"
      ),
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=400&fit=crop",
  },

  {
    id: "e10",
    type: "campus",
    organizer:
      "Campus Dining",
    name:
      "Late Night Breakfast",
    description:
      "Free breakfast served during midterm season.",
    location:
      "Dewick Dining Hall",
    startDate: new Date(
      "2026-10-14T22:00:00"
    ),
    endDate: new Date(
      "2026-10-15T00:00:00"
    ),
    rsvpDeadline:
      new Date(
        "2026-10-14T18:00:00"
      ),
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
  },
];