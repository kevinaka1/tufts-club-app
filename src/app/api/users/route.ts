import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { patchUserProfile } from "@/apis/patchUserProfile";

export async function PATCH(req: Request) {
    const { graduationYear } = await req.json();

    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    console.log("PATCH USER PROFILE");
    console.log("user:", user);
    console.log("authError:", authError);

    if (authError || !user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    console.log(`Is user id the same ${user.id == "703f8bc8-fc8b-4150-b59a-7adb72c767cb"}`)
    const { data, error } = await patchUserProfile(
        user.id,
        Number(graduationYear)
    );

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({
        data: data,
        success: true,
    });

}