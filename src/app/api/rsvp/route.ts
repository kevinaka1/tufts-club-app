
console.log(
    "SUPABASE URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
);

console.log(
    "SERVICE KEY:",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10)
);

import { postRSVPToEvent } from "../../../apis/postRSVPToEvent";
import { deleteRSVPToEvent } from "../../../apis/deleteRSVPToEvent";


export async function POST(req: Request) {
    const { userId, eventId } = await req.json();

    const { error } = await postRSVPToEvent(userId, eventId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const { userId, eventId } = await req.json();

    const { error } = await deleteRSVPToEvent(userId, eventId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}