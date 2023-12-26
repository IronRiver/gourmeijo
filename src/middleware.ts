import { NextResponse, type NextRequest } from "next/server";

async function getIsInMaintenanceMode() {
  if (process.env.MAINTENANCE_MODE === "true") {
    return true;
  }

  // TODO: Vercel Edge Configの利用

  return await Promise.resolve(false);
}

export async function middleware(request: NextRequest) {
  const isInMaintenanceMode = await getIsInMaintenanceMode();
  if (isInMaintenanceMode) {
    return NextResponse.rewrite(new URL("/maintenance", request.url), {
      status: 503,
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.svg (icon file)
     */
    "/((?!api|_next/static|_next/image|icon.svg|favicon.ico).*)",
  ],
};
