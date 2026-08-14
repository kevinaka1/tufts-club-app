import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { postRSVPToEvent } from "../../../apis/postRSVPToEvent";
import { deleteRSVPToEvent } from "../../../apis/deleteRSVPToEvent";

const supabase = await createClient();


export async function POST(req: Request) {

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { eventId } = await req.json();

    const { error } = await postRSVPToEvent(user.id, eventId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { eventId } = await req.json();

    const { error } = await deleteRSVPToEvent(user.id, eventId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}