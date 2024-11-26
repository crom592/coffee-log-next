import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

export const config = {
  matcher: [
    "/logs/:path*",
    "/dashboard/:path*",
    "/api/logs/:path*",
    "/api/dashboard/:path*"
  ],
};
