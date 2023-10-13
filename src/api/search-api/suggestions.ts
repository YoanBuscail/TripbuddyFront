import client from "./client";

// Fonction pour obtenir des suggestions en fonction du mot-clé, de la catégorie et de la bbox
export const getSuggestions = async (keyword: string, category: string, sessionToken: string)  => {       // ajouter bbox: string en paramètre si nécessaire
    // Effectuer une requête GET vers l'API de suggestions
    const { data } = await client.get("/suggest", {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        language: "fr",
        limit: 5, // Nombre de suggestions à retourner
        q: keyword, // Mot-clé de recherche
        poi_category: category, // Catégorie de POI
        // bbox: bbox, // Zone de délimitation de la recherche (décommenter si nécessaire)
        session_token: sessionToken,
      },
    });

    // Retourner la liste des suggestions ou un tableau vide en cas d'erreur
    return data?.suggestions ?? [];
};
