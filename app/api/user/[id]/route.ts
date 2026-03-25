import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json({ userId: id, message: `Hello user ${id}` });
}