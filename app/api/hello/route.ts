import { NextRequest, NextResponse } from "next/server";

// export default function Hello(
//     req: NextApiRequest,
//     res: NextApiResponse<{text: string}>
// ) {
//     res.status(200).json({ text: "Hello"})
// }

export async function GET(req: NextRequest) {
  return NextResponse.json({ text: "Hello"})
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json({ text: `Received POST data ${JSON.stringify(body)}`})
}