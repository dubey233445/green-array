import { NextResponse } from "next/server";
import { headers } from 'next/headers'
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function middleware(req: NextRequest) {


    const allHeaders = await headers();
    allHeaders.get("token")
    
    console.log(allHeaders,"All Headers");
    

  // Get a specific header by its name
  const token = req.headers.get('token');
  // .get("token")?.value;
  console.log(token);
  
  
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
      console.log(err);
      
      return err;

    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/plants/add"],
};
