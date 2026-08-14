// 📁 middleware.ts (at project root or src/middleware.ts)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getUserProfile } from "./apis/getUserProfile";

console.log("MIDDLEWARE FILE LOADED"); // will now run

export async function middleware(request: NextRequest) {
    console.log("MIDDLEWARE RUNNING:", request.nextUrl.pathname);

    let response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                        response.cookies.set(name, value);
                    });
                },
            },
        }
    );

    const { data, error } = await supabase.auth.getUser();

    const user = data?.user;

    const protectedRoutes = ["/explore", "/clubs", "/profile", "/onboarding"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    let userProfile;
    if (user) {
        userProfile = await getUserProfile(user.id)
        if (!userProfile?.graduationYear &&
            request.nextUrl.pathname !== "/onboarding") {
            return NextResponse.redirect(new URL("/onboarding", request.url));
        }
        else if (userProfile?.graduationYear &&
            request.nextUrl.pathname === "/onboarding") {
            return NextResponse.redirect(new URL("/", request.url))
        }

    }

    return response;
}

export const config = {
    matcher: [
        "/explore/:path*",
        "/clubs/:path*",
        "/profile/:path*",
        "/onboarding/:path*",
    ],
};