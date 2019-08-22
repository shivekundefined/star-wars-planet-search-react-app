export const ROUTES = {
    PUBLIC: [
        "/login",
        "/register"
    ],
    PROTECTED: [
        "/search-planet",
        "/planet-details",
    ],
    DEFAULT_IF_LOGGED_IN:  "/search-planet",
    DEFAULT_IF_NOT_LOGGED_IN: "/login",
    SUCCESS_LOGGED_IN: "/search-planet",

}