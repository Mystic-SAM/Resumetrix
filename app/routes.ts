import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("/auth", "routes/Auth.tsx"),
] satisfies RouteConfig;
