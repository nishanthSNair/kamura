import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect provider dashboard — public provider profiles, login, signup stay open
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/provider/dashboard")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/provider/login";
    return NextResponse.redirect(url);
  }

  // Member dashboard is open to guests — only /my/profile requires auth (data edit)
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/my/profile")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/my/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
