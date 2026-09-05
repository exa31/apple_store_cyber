import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest) => {
    try {
        const res = await fetch(`${process.env.API_ENDPOINT_DATA}/categories`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : (json?.data || json?.categories || []);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
};