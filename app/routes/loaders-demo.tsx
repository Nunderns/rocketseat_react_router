import type { Route } from "./+types/loaders-demo"
export async function loader(){
  const response = await fetch("https://api.openbrewerydb.org/v1/breweries");
  const breweries = (await response.json()) as Brewery[];
  
  return {
    title: "RR7",
    breweries,
  };
}

export default function ({loaderData}: Route.ComponentProps) {
  return <>
    <h2>{loaderData.title}</h2>
    <ul>
      {loaderData.breweries?.map((brewery) => (
        <li key={brewery.id}>{brewery.name}</li>
      ))}
    </ul>
  </>;
}

