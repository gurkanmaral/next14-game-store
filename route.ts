export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-password",
    '/api/webhook/stripe',
    "/discover",
    "/api/getGames",
    "/users",
    "/game-details/:id",
    "/:id",
    "/api/upload"
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset"
];
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";