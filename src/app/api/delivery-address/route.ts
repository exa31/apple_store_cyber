import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const token = cookies().get('jwt');
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const res = await fetch(`${process.env.API_ENDPOINT_DATA}/delivery-addresses`, config);
        if (res.status === 404) {
            return NextResponse.json({ message: 'Not Found', status: 404 });
        }
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data?.data || data?.deliveryAddresses || []);
        return NextResponse.json(list);
    } catch (error: any) {
        return NextResponse.error();
    }
}


export const POST = async (req: NextRequest) => {
    const token = cookies().get('jwt');
    const config = {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const payload = await req.json();
        const { data } = await axios.post(`${process.env.API_ENDPOINT_DATA}/delivery-addresses`, payload, config);
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
};          