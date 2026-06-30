import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAuthDecision } from "./lib/auth/routes";
import { validateDevBypass, validateVideoCoachBypass } from "./lib/auth/dev-bypass";

const clerkHandler = clerkMiddleware(async (auth, req) => {
  const decision = await getAuthDecision(req, auth);

  switch (decision.action) {
    case "public":
    case "next":
      return NextResponse.next();
    case "redirect":
      return NextResponse.redirect(new URL(decision.signInUrl));
    case "deny":
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: decision.status || 401 }
      );
    default:
      return NextResponse.next();
  }
});

export default function middleware(req, event) {
  /**
   * Development Authentication Bypass
   * 
   * This allows bypassing Clerk authentication during local development when:
   * - NODE_ENV is "development"
   * - SKIP_AUTH is set to "true"
   * - The request originates from localhost or 127.0.0.1
   * 
   * SECURITY: This bypass is validated with multiple safety checks to prevent
   * accidental deployment with disabled authentication. Unsafe configurations
   * will throw errors rather than silently continuing.
   */
  const skipAuthEnabled = process.env.SKIP_AUTH === "true";
  
  if (skipAuthEnabled) {
    const validation = validateDevBypass({
      hostname: req.nextUrl.hostname,
      skipAuthEnabled: true,
      reason: "SKIP_AUTH=true",
    });

    if (validation.allowed) {
      return NextResponse.next();
    }

    // If validation failed with an error, throw it to fail fast
    if (validation.error) {
      throw validation.error;
    }
  }

  /**
   * Video-Coach Route Development Bypass
   * 
   * The video-coach feature bypasses authentication on localhost in development
   * to facilitate local development without requiring Clerk setup.
   * 
   * SECURITY: This bypass is validated to ensure it only works on localhost
   * in development mode. It will throw an error if used in production or
   * on non-localhost hosts.
   */
  if (/^\/interview\/video-coach(?:$|\/)/.test(req.nextUrl.pathname)) {
    const validation = validateVideoCoachBypass({
      hostname: req.nextUrl.hostname,
    });

    if (validation.allowed) {
      return NextResponse.next();
    }

    // If validation failed with an error, throw it to fail fast
    if (validation.error) {
      throw validation.error;
    }
  }

  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[^?]*$).*)',
    // Always run for API/TRPC routes
    '/(api|trpc)(.*)',
  ],
};
