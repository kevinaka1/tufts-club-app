import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { postUserInterestedFormingClub } from "../../../apis/postUserInterestedFormingClub";
import { deleteUserInterestedFormingClub } from "../../../apis/deleteUserInterestedFormingClub";


export async function POST(req: Request) {
    const { userId, formingClubId } = await req.json();

    const { error } = await postUserInterestedFormingClub(userId, formingClubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const { userId, formingClubId } = await req.json();

    const { error } = await deleteUserInterestedFormingClub(userId, formingClubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}