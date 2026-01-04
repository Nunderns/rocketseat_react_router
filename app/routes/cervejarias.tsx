import type { Route } from "./+types/cervejarias";
import { Link, Outlet } from "react-router";

export async function loader() {
  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as Brewery[];

  return {
    title: "Cervejarias",
    breweries,
  };
}

export default function ({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{loaderData.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lista de Cervejarias</h3>
          <ul className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {loaderData.breweries?.map((brewery) => (
              <li key={brewery.id} className="group">
                <Link
                  to={`/cervejarias/${brewery.id}`}
                  className="block p-3 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-800 hover:text-indigo-600 font-medium"
                >
                  {brewery.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}