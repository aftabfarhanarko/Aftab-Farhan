import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const url = new URL(req.url);
  const referer = req.headers.get("referer");
  const secFetchSite = req.headers.get("sec-fetch-site");
  const secFetchMode = req.headers.get("sec-fetch-mode");

  // Secure API routes (excluding /api/auth endpoints)
  if (url.pathname.startsWith("/api") && !url.pathname.startsWith("/api/auth")) {
    // 1. Block direct browser address bar visits (e.g. navigation requests)
    if (secFetchMode === "navigate" || secFetchSite === "none") {
      return new NextResponse(
        JSON.stringify({ error: "Not Found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Block cross-origin/external client hits
    if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "same-site") {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Block requests with non-matching referer hostnames
    if (referer) {
      try {
        const refererUrl = new URL(referer);
        if (refererUrl.host !== url.host) {
          return new NextResponse(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }
      } catch (e) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  // Run middleware on all paths except static files, Next.js image optimization, and favicon
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
