export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/test/:path*", "/ejercicios"] };
