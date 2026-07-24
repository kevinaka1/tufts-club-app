export type EventType = {
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