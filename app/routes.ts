import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("loaders", "routes/loaders-demo.tsx"),
] satisfies RouteConfig;

