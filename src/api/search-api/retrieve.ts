import client from "./client";


// Fonction pour obtenir des suggestions en fonction du mot-clé, de la catégorie et de la bbox
export const getRetrieve = async (mapbox_id, sessionToken: string)  => {       
    // Effectuer une requête GET vers l'API de suggestions
    const { data } = await client.get(`/retrieve/${mapbox_id}`, {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        session_token: sessionToken,
      },
    });

    // Retourner la liste des suggestions ou un tableau vide en cas d'erreur
    return data ?? [];
};
