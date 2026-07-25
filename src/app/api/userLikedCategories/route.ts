import { postUserLikedCategory } from "../../../apis/postUserLikedCategory";
import { deleteUserLikedCategory } from "../../../apis/deleteUserLikedCategory";


export async function POST(req: Request) {
    const { userId, categoryId } = await req.json();

    const { error } = await postUserLikedCategory(userId, categoryId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true });

}

export async function DELETE(req: Request) {
    const { userId, categoryId } = await req.json();

    const { error } = await deleteUserLikedCategory(userId, categoryId);

    if (error) {
        return Response.json(error, { status: 500 });
    }

    return Response.json({ success: true })
}