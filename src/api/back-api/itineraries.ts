import client from "./client";

export const getItineraries = async (token:string) => {
  const { data } = await client.get(`/itineraries`, 
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
  );
  return data ?? [];
}