import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_CATEGORIES = [
    { name: "iPhone" },
    { name: "iPad" },
    { name: "MacBook" },
    { name: "Apple Watch" },
    { name: "AirPods" },
];

export const GET = async (_req: NextRequest) => {
    try {
        const apiEndpoint =
            process.env.API_ENDPOINT_DATA ||
            (process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "") ||
            "https://be-apple-store.eka-dev.cloud/api";

        const res = await fetch(`${apiEndpoint}/categories`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json(DEFAULT_CATEGORIES);
        }

        const json = await res.json();
        const data = Array.isArray(json)
            ? json
            : (json?.data || json?.categories || DEFAULT_CATEGORIES);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(DEFAULT_CATEGORIES);
    }
};