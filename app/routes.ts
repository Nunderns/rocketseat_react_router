import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("cervejarias", "routes/cervejarias.tsx", [
    route(":id", "routes/cervejaria.tsx"),
  ]),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;

