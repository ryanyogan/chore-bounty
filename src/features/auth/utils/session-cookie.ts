import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "session";

export async function setSessionCookie(sessionToken: string, expiresAt: Date) {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
}

export async function deleteSessionCookie() {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: "",
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
}
