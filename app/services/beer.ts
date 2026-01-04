export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state: string;
  county_province: string | null;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  updated_at: string;
  created_at: string;
}

export async function getBrewery(id: string): Promise<Brewery> {
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/${id}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar cervejaria: ${response.statusText}`);
    }

    const brewery = (await response.json()) as Brewery;
    return brewery;
  } catch (error) {
    console.error('Erro ao buscar detalhes da cervejaria:', error);
    throw error;
  }
}