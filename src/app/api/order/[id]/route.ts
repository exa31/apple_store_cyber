import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const token = cookies().get("jwt");

    const config = token?.value
      ? {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      : undefined;

    const response = await axios.get(
      `${process.env.API_ENDPOINT_DATA}/orders/${id}`,
      config
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Order fetch error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || "Failed to fetch order details";
    return NextResponse.json({ message }, { status });
  }
};
