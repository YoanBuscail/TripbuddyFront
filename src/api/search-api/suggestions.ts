import client from "./client";

// Fonction pour obtenir des suggestions en fonction du mot-clé, de la catégorie et de la bbox
export const getSuggestions = async (keyword: string, category: string)  => {       // ajouter bbox: string en paramètre si nécessaire
  try {
    // Effectuer une requête GET vers l'API de suggestions
    const { data } = await client.get("/suggest", {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
        language: "fr",
        limit: 5, // Nombre de suggestions à retourner
        q: keyword, // Mot-clé de recherche
        poi_category: category, // Catégorie de POI
        // bbox: bbox, // Zone de délimitation de la recherche (décommenter si nécessaire)
      },
    });

    // Retourner la liste des suggestions (listItems) ou un tableau vide en cas d'erreur
    return data?.listItems || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des suggestions :", error);
    return [];
  }
};
