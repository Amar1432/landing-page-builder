import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoot = createRouteMatcher(["/dashboard(.*)", "/editor(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const cleanHostname = hostname.split(":")[0];

  // 1. Clerk Auth Protection for Root App
  if (isProtectedRoot(req)) {
    await auth.protect();
  }

  // 2. Skip Subdomain Rewrites for API and Static Routes 
  // (Clerk auth still runs on these above if they matched isProtected, but rewrites should skip)
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 3. Multi-Tenant Domain Parsing
  // Identify known root domains
  const rootDomains = ["localhost", "saasbuilder.com", "domain.com", "vercel.app"];
  const isRootDomain = rootDomains.some(domain => cleanHostname === domain || cleanHostname.endsWith(`.${domain}`) && cleanHostname.split('.').length === 2 && domain === "vercel.app");

  // Treat "www" explicitly as root domain
  const isWww = cleanHostname.startsWith("www.localhost") || cleanHostname.startsWith("www.saasbuilder.com");

  if (!isRootDomain && !isWww) {
    // 3a. Classification: Subdomain vs Custom Domain
    // If the host ends with one of our root domains, it's a subdomain. 
    // Example: test-page.saasbuilder.com
    const isSubdomain = rootDomains.some(domain => cleanHostname.endsWith(`.${domain}`));

    if (isSubdomain) {
      // Subdomain -> Extract ONLY the leftmost segment (e.g. test-page)
      const slug = cleanHostname.split(".")[0];
      return NextResponse.rewrite(new URL(`/sites/${slug}${url.pathname}`, req.url));
    } else {
      // Custom Domain -> Pass the entire normalized domain (e.g. www.mybrand.com)
      return NextResponse.rewrite(new URL(`/sites/${cleanHostname}${url.pathname}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match everything except explicit Next.js static asset routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
