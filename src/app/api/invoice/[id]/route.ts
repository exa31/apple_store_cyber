import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    const token = cookies().get('jwt');
    try {
        const res = await fetch(`${process.env.API_ENDPOINT_DATA}/invoices/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.value}`
            },
            cache: 'no-store'
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
};