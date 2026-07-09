import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isPublicRoute, isProtectedApiRoute } from "./lib/auth/routes";

export default clerkMiddleware(async (auth, req) => {
  if (process.env.NODE_ENV === "development" && process.env.SKIP_AUTH === "true") {
    return NextResponse.next();
  }

  const isLocalhost = req.nextUrl.hostname === "localhost" || req.nextUrl.hostname === "127.0.0.1";
  if (process.env.NODE_ENV === "development" && isLocalhost && /^\/interview\/video-coach(?:$|\/)/.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (isProtectedApiRoute(req)) {
    await auth.protect();
    return NextResponse.next();
  }

  await auth.protect();
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Always run for API/TRPC routes
    '/(api|trpc)(.*)',
  ],
};
