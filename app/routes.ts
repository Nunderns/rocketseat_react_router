import { 
  type RouteConfig, 
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main.tsx", [
    index("routes/home.tsx"),
    route("/cervejarias", "routes/cervejarias.tsx"),
    route("/cervejarias/:id", "routes/cervejaria.tsx"),
  ]),
  route("/login", "routes/login.tsx"),
] satisfies RouteConfig;