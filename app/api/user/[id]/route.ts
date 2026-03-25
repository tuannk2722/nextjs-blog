import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  return NextResponse.json({
    userId: id,
    message: `Hello user ${id}`
  })
}