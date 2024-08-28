import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface Data {
    productId: string
}

export const POST = async (req: NextRequest) => {
    const token = cookies().get('jwt')
    const data: Data = await req.json()
    const config = {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    }
    try {
        const res = await axios.post('http://localhost:5340/api/carts/remove', {
            productId: data.productId
        }, config)
        NextResponse.json({ message: 'Item reduced from cart', data: res.data })
    } catch (e) {
        return NextResponse.error()
    }
};