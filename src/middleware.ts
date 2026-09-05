import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const cookie = cookies().get("jwt");
  if (!cookie?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(`${process.env.API_ENDPOINT_USER}/me`, {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    const data = await res.json();
    if (res.status === 401 || !data?.user) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("next-auth.session-token", "", { path: "/", expires: new Date(0) });
      response.cookies.set("next-auth.csrf-token", "", { path: "/", expires: new Date(0) });
      cookies().delete("jwt");
      return response;
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/cart", "/checkout/:path*"],
};