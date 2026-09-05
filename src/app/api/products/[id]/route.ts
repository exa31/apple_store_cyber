import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const res = await fetch(`${process.env.API_ENDPOINT_DATA}/products/${id}`, {
            cache: 'no-store',
        });
        const data = await res.json();
        if (!res.ok || data.error) {
            return NextResponse.error();
        }
        const product = (data?.data && data?.success !== undefined) ? data.data : (data?._doc || data);
        return NextResponse.json({ data: product });
    } catch (err) {
        return NextResponse.error();
    }
}