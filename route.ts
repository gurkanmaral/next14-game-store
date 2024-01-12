export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password",
    '/api/webhook/stripe',
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset"
];
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";