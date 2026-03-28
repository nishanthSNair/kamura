import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const PASSWORD = process.env.ADMIN_PASSWORD || "";
const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function signToken(value: string): string {
 return createHmac("sha256", PASSWORD).update(value).digest("hex");
}

function verifySession(cookie: string | undefined): boolean {
 if (!cookie) return false;
 const expected = signToken("admin-authenticated");
 return cookie === expected;
}

// POST — Login
export async function POST(request: NextRequest) {
 const { password } = await request.json();

 if (password !== PASSWORD) {
 return NextResponse.json({ error: "Invalid password" }, { status: 401 });
 }

 const token = signToken("admin-authenticated");
 const response = NextResponse.json({ success: true });
 response.cookies.set(COOKIE_NAME, token, {
 httpOnly: true,
 secure: process.env.NODE_ENV === "production",
 sameSite: "strict",
 maxAge: MAX_AGE,
 path: "/",
 });

 return response;
}

// GET — Check session
export async function GET(request: NextRequest) {
 const cookie = request.cookies.get(COOKIE_NAME)?.value;
 const valid = verifySession(cookie);
 return NextResponse.json({ authenticated: valid });
}

// DELETE — Logout
export async function DELETE() {
 const response = NextResponse.json({ success: true });
 response.cookies.delete(COOKIE_NAME);
 return response;
}
