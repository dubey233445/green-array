import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (req.nextUrl.pathname.startsWith("/plants/add")) {
    if (!token) {
      console.log("No token found");
      
      return NextResponse.redirect(new URL("/signup", req.url));
    }

    try {
      // Verify JWT
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      // Invalid/expired token → force signup/login
      return NextResponse.redirect(new URL("/signup", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/plants/add"],
};
