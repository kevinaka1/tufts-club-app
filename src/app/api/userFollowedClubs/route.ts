import { postUserFollowedClub } from "../../../apis/postUserFollowedClub";
import { deleteUserFollowedClub } from "../../../apis/deleteUserFollowedClub";


export async function POST(req: Request) {
    const { userId, clubId } = await req.json();

    const { error } = await postUserFollowedClub(userId, clubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const { userId, clubId } = await req.json();

    const { error } = await deleteUserFollowedClub(userId, clubId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}