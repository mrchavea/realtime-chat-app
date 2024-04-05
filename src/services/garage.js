import baseURL from "../lib/baseURL";

export async function getGarage(garageSlug) {
  try {
    const res = await fetch(`${baseURL}/api/garages/${garageSlug}`, {
      next: { revalidate: 0 },
      //cache: 'no-cache',
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) return undefined;
    const garage = await res.json();
    delete garage.comments;
    return garage;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function getGarages(query = null, filter = null) {
  const url = new URL(`${baseURL}/api/garages`);
  if (query) url.searchParams.append("query", query);
  if (filter) url.searchParams.append("filter", filter);
  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
      //cache: 'no-cache',
      method: "GET",

      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) return undefined;
    const garage = await res.json();
    delete garage.comments;
    return garage;
  } catch (error) {
    console.log("ERROR¿", error);
    throw new Error(error?.message);
  }
}

export const getGaragesByCity = async (
  citySlug,
  filter,
  offsetPagination = null
) => {
  const url = new URL(`${baseURL}/api/garages/city/${citySlug}`);
  if (filter) url.searchParams.append("filter", filter);
  if (offsetPagination)
    url.searchParams.append("offsetPagination", offsetPagination);
  console.log("URL?", url);
  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) return undefined;
    const json = await res.json();
    return json.garages;
  } catch (error) {
    throw new Error(error?.message);
  }
};

export const getGarageComments = async (garageSlug) => {
  try {
    const res = await fetch(`${baseURL}/api/garages/${garageSlug}/comments`, {
      next: { revalidate: 0, tags: ["comments"] },
      // cache: 'no-cache',
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) return undefined;
    return await res.json().then((json) => json.comments);
  } catch (error) {
    throw new Error(error?.message);
  }
};
