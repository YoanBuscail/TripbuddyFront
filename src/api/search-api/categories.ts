import client from "./client";

export const getCategories = async () => {
  const { data } = await client.get('/list/category', {
    params: {
      access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      language: "fr",
    }
  }
  );
  return data?.listItems ?? [];
}