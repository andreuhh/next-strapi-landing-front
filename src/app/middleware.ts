import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserMeLoader } from "../app/data/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
    const user = await getUserMeLoader();
    const currentPath = request.nextUrl.pathname;

    console.log('###########');
    console.log(user);
    console.log(currentPath);
    console.log('###########');

    if (currentPath.startsWith("/dashboard") && user.ok === false) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}