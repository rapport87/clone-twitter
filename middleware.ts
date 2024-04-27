import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

console.log("middleware")

interface Routes {
    [key: string]: boolean;
  }

const publicOnlyUrls: Routes = {
    "/log-in": true,
    "/create-account": true,
  };

export async function middleware(request: NextRequest) {
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname];
    if (!session.id) {
      if (!exists) {
        return NextResponse.redirect(new URL("/log-in", request.url));
      }
    } else {
      if (exists) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }