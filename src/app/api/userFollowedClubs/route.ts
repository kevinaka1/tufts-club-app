import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { postUserFollowedClub } from "../../../apis/postUserFollowedClub";
import { deleteUserFollowedClub } from "../../../apis/deleteUserFollowedClub";

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

    const { clubId } = await req.json();

    const { error } = await postUserFollowedClub(user.id, clubId);

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

    const { clubId } = await req.json();

    const { error } = await deleteUserFollowedClub(user.id, clubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}