import type { Route } from "./+types/cervejaria";
import { ErrorBoundary } from "~/root";
import { getBrewery } from "~/services/beer";

export async function loader({ params }: Route.LoaderArgs) {
  return await getBrewery(params.id);
}

export default function Cervejaria({ loaderData }: Route.ComponentProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <pre className="text-black bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </div>
  );
}

export { ErrorBoundary };