import { client2 } from "./client";


// Fonction pour obtenir les directions en fonction des coordonnées
export const getDirections = async (coordinates)  => {       
    // Convertir les coordonnées au bon format
    const modifiedCoordinates = coordinates.map(coord => coord.join(',')).join(';');
    
    // Effectuer une requête GET vers l'API de suggestions
    const { data } = await client2.get(`/driving/${modifiedCoordinates}`, {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      },
    });

    // Retourner les directions ou un tableau vide en cas d'erreur
    return data ?? [];
};
