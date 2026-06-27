// import { auth } from "@/auth";

// export default auth((req) => {
//   if (!req.auth) {
//     return Response.redirect(new URL("/login", req.url));
//   }
// });

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
export default NextAuth(authConfig).auth;
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
