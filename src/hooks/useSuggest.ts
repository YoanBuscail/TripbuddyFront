import { getSuggestions } from "../api/search-api/suggestions";
import { useState } from "react";
import { useSessionToken } from "./useSessionToken";

export const useSuggest = () => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const sessionToken = useSessionToken()


    const suggest = async (inputValue: string, category: string | undefined) => {
        try {
            // Utilise la valeur actuelle de locationName comme le paramètre keyword
            const result = await getSuggestions(inputValue, category, sessionToken);

            // Mise à jour de l'état des suggestions avec les résultats de la requête
            setSuggestions(result);

        } catch (error) {
            console.error("Erreur lors de la récupération des suggestions :", error);
            setSuggestions([]);
        }
    }

    return { suggest, suggestions };
}
