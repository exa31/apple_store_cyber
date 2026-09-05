import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const token = cookies().get("jwt");

    if (!token?.value) {
      return NextResponse.json(
        { message: "Unauthorized. Please login first." },
        { status: 401 }
      );
    }

    const overrideNotification =
      req.headers.get("x-override-notification") ||
      process.env.MIDTRANS_OVERRIDE_NOTIFICATION_URL;

    const config = {
      headers: {
        Authorization: `Bearer ${token.value}`,
        ...(overrideNotification
          ? { "x-override-notification": overrideNotification }
          : {}),
      },
    };

    const response = await axios.post(
      `${process.env.API_ENDPOINT_DATA}/orders/charge`,
      body,
      config
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Order charge error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || "Failed to process Core API payment";
    return NextResponse.json({ message, error: error.response?.data }, { status });
  }
};
