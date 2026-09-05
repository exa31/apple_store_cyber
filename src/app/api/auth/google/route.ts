import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { credential, token: inputToken } = body;
    const token = credential || inputToken;

    if (!token) {
      return NextResponse.json(
        { message: "Google credential token is required" },
        { status: 400 }
      );
    }

    // Forward credential to Backend for pure cryptographic verification
    const backendRes = await fetch(`${process.env.API_ENDPOINT_USER}/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: token }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok || !data.token) {
      return NextResponse.json(
        { message: data.message || "Google authentication verification failed", error: data },
        { status: backendRes.status || 401 }
      );
    }

    // Set secure JWT cookie issued by the backend
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    cookies().set("jwt", data.token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires,
    });

    return NextResponse.json({
      status: "success",
      token: data.token,
      user: {
        name: data.name,
        email: data.email,
        role: data.role,
        picture: data.picture,
      },
    });
  } catch (error: any) {
    console.error("Google auth route error:", error);
    return NextResponse.json(
      { message: "Internal server error during Google auth" },
      { status: 500 }
    );
  }
};
