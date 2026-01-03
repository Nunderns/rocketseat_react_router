import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rocketseat" },
    { name: "description", content: "Rocketseat te ensina RR7" },
  ];
}

export default function Home() {
  return (
    <h1 className="text-6x1 font-bold text-center mt-48 text-purple-800">
    Rocketseat
    </h1>
  );
}
