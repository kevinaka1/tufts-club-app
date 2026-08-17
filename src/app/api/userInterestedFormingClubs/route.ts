import { postUserInterestedFormingClub } from "../../../apis/postUserInterestedFormingClub";
import { deleteUserInterestedFormingClub } from "../../../apis/deleteUserInterestedFormingClub";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
    const supabase = await createClient();

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

    const { formingClubId } = await req.json();

    const { error } = await postUserInterestedFormingClub(user.id, formingClubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const supabase = await createClient();

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

    const { formingClubId } = await req.json();

    const { error } = await deleteUserInterestedFormingClub(user.id, formingClubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}