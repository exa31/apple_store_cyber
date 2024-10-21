import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const category = req.nextUrl.searchParams.get('category')
    const skip = req.nextUrl.searchParams.get('skip')
    const q = req.nextUrl.searchParams.get('q')
    const id = req.nextUrl.searchParams.get('id')
    const limit = req.nextUrl.searchParams.get('limit')
    const response = await fetch(`${process.env.API_ENDPOINT_DATA}/products?limit=${limit}&skip=${skip}&category=${category || ''}&q=${q || ''}&id=${id || ''}`)
    const data = await response.json()
    if (!data) {
        return NextResponse.error()
    }
    return NextResponse.json(data)
}
