import axios from "axios";
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    const cookie = cookies().get('jwt')
    if (!cookie) {
        return NextResponse.error()
    }
    const config = {
        headers: {
            Authorization: `Bearer ${cookie.value}`
        }
    }
    try {
        const { data } = await axios.get(`${process.env.API_ENDPOINT_DATA}/likes`, config)
        const list = Array.isArray(data) ? data : (data?.data || data?.likes || []);
        return NextResponse.json(list)
    } catch (error) {
        return NextResponse.error()
    }
}

export const POST = async (req: NextRequest) => {
    const cookie = cookies().get('jwt')
    if (!cookie) {
        return NextResponse.error()
    }
    const request: { productId: string } = await req.json()
    const config = {
        headers: {
            Authorization: `Bearer ${cookie.value}`
        }
    }
    try {
        const res = await axios.post(`${process.env.API_ENDPOINT_DATA}/likes`, request, config)
        return NextResponse.json(res.data)
    } catch (error) {
        return NextResponse.error()
    }
}