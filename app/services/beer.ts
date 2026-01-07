import { cache, TTL } from "./cache";

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

interface BreweryListParams {
  page?: number;
  per_page?: number;
  by_city?: string;
  by_name?: string;
  by_type?: string;
}

const API_BASE_URL = 'https://api.openbrewerydb.org/v1/breweries';

async function fetchWithCache<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
  try {
    const cachedData = await cache.get(key);
    if (cachedData) {
      console.log(`[CACHE HIT] ${key}`);
      return JSON.parse(cachedData);
    }

    console.log(`[CACHE MISS] Fetching data for key: ${key}`);
    const data = await fetchFn();
    
    try {
      await cache.set(key, JSON.stringify(data), 'EX', TTL);
    } catch (cacheError) {
      console.error('[CACHE ERROR] Failed to store in cache:', cacheError);
    }
    
    return data;
  } catch (error) {
    console.error(`[ERROR] in fetchWithCache for key ${key}:`, error);
    throw error;
  }
}

export async function getBrewery(id: string): Promise<Brewery> {
  const cacheKey = `brewery:${id}`;
  
  return fetchWithCache<Brewery>(cacheKey, async () => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch brewery: ${response.statusText}`);
    }
    return response.json();
  });
}

export async function getBreweries(params: BreweryListParams = {}): Promise<Brewery[]> {
  const { page = 1, per_page = 10, ...filters } = params;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: per_page.toString(),
    ...Object.fromEntries(
      Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    )
  });
  
  const cacheKey = `breweries:${queryParams.toString()}`;
  
  return fetchWithCache<Brewery[]>(cacheKey, async () => {
    const response = await fetch(`${API_BASE_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch breweries: ${response.statusText}`);
    }
    return response.json();
  });
}

export async function searchBreweries(query: string): Promise<Brewery[]> {
  if (!query.trim()) return [];
  
  const cacheKey = `search:${query.toLowerCase()}`;
  
  return fetchWithCache<Brewery[]>(cacheKey, async () => {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }
    return response.json();
  });
}

export async function getRandomBrewery(): Promise<Brewery> {
  return fetchWithCache<Brewery>('random:brewery', async () => {
    const response = await fetch(`${API_BASE_URL}/random`);
    if (!response.ok) {
      throw new Error('Failed to fetch random brewery');
    }
    const breweries = await response.json();
    return Array.isArray(breweries) ? breweries[0] : breweries;
  });
}