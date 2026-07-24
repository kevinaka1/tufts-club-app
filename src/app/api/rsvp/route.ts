import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
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