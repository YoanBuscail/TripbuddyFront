import Navbar from "../components/navbar/Navbar";
import { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import client from '../api/map-api/client'
import { useSessionToken } from "../hooks/useSessionToken"
import { useCategories } from "../hooks/useCategories"
import Select from 'react-select';
import { getSuggestions } from '../api/search-api/suggestions';
import { getRetrieve } from "../api/search-api/retrieve";


function Itineraries() {
    const styleObject = {
        height: '100vh',
    };

    const formStyle = {
        position: 'fixed',
        top: '5em',
        left: '5em',
        background: '#FFF',
        'zIndex': 20,
        padding: '1em',
    }

    // référence qui contiendra la div destinée à contenir la map
    const mapContainer = useRef<HTMLDivElement | null>(null)
    // référence qui contiendra l'object Map qu'on va créer
    const map = useRef<Map | null>(null)

    // state de la liste des suggestions
    const [suggestions, setSuggestions] = useState<any[]>([])

    // state de la liste des categories
    const categories = useCategories()

    // state de la valeur de l'input suggestion
    const [locationName, setLocationName] = useState('');

    // state de la catégorie selectionnée
    const [category, setCategory] = useState<any>(null)

    const sessionToken = useSessionToken();

    // state pour l'itinéraire
    const [itinerary, setItinerary] = useState<any[]>([]);

    useEffect(() => {
        if (mapContainer.current && !map.current) {
            // 1) on déclare un objet config, qu'on remplit avec les options nécessaires à créer la map
            const config = {
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-4.486076, 48.390394] as [number, number],
                zoom: 8,
            };

            // 2) si la geolocalisation est activée sur le navigateur, on center la map sur la position du user
            navigator?.geolocation?.getCurrentPosition((position) => {
                config.center = [
                    position.coords.longitude,
                    position.coords.latitude,
                ];
            });

            // 3) on crée la map et on la stocker dans la ref prévue à cet effet
            map.current = new client.Map(config);
        }
    }, [map.current]);

    const handleLocationNameChange = (e) => {
        const newValue = e.target.value;
        setLocationName(newValue);
    
        // Appel de la fonction "handleSuggest" avec la nouvelle saisie
        handleSuggest(newValue);
    };
    
    const handleSuggest = async (inputValue: string) => {
        try {
            console.log("Keyword:", inputValue);
            console.log("Category:", category);
    
            // Utilise la valeur actuelle de locationName comme le paramètre keyword
            const result = await getSuggestions(inputValue, category?.canonical_id, sessionToken);
            /* const data = await response.json();
             */
            console.log("Suggestions:", result);
    
            // Mise à jour de l'état des suggestions avec les résultats de la requête
            setSuggestions(result);

        } catch (error) {
            console.error("Erreur lors de la récupération des suggestions :", error);
            setSuggestions([]);
        }
    };

    const handleSuggestSelection = async (selectedOption) => {
        const retrieveSuggestion = await getRetrieve(selectedOption.value, sessionToken);
        console.log("Suggestion sélectionnée:", retrieveSuggestion);
    
        const coordinates = retrieveSuggestion.features[0].geometry.coordinates;
        console.log("Coordonnées de la suggestion:", coordinates);

        const marker = new client.Marker()
            .setLngLat(coordinates)
            .addTo(map.current);
    
        const name = retrieveSuggestion.features[0].properties.name;
        const address = retrieveSuggestion.features[0].properties.address;
        const placeFormatted = retrieveSuggestion.features[0].properties.place_formatted;
    
        const addDestination = () => {
            setItinerary([...itinerary, retrieveSuggestion.features[0]]);
        };
    
        const popupContent = `
            <p><strong>${name}</strong></p>
            ${address ? `<p>${address}</p>` : ''}
            <p>${placeFormatted}</p>
            <button onclick=${addDestination()}>Ajouter à mon itinéraire</button>
        `;
    
        const popup = new client.Popup()
            .setHTML(popupContent);
    
        marker.setPopup(popup);
    };


    return (
        <>
            <Navbar />
            <div className="map-parent" style={styleObject}>
                <div ref={mapContainer} className="containe-map" style={styleObject} />
                    <div className="map-form" style={formStyle}>
                        
                        <input
                        type="text"
                        placeholder="Rechercher une destination"
                        value={locationName}
                        onChange={handleLocationNameChange} // Appel de la fonction "handleLocationNameChange" à chaque saisie
                        />
                        
                        {/* Utilise react-select pour l'autocomplétion des catégories */}
                        <Select
                        options={categories.map((item) => ({value: item.canonical_id, label: item.name}))}
                        onChange={(selectedOption) => {
                            const selectedCategory = categories.find((item) => item.canonical_id === selectedOption?.value);
                            setCategory(selectedCategory);
                        }}
                        value={category ? { value: category.canonical_id, label: category.name } : null}
                        placeholder="Selectionnez une catégorie"
                        isSearchable={true} // Active la recherche dans le champ
                        />
                        
                        {/* Afficher les suggestions ici */}
                        <Select
                            options={suggestions?.map((suggestion) => ({value: suggestion.mapbox_id, label: suggestion.name}))}
                            onChange={(selectedOption) => {                
                                // Appel de la fonction de récupération des détails de la suggestion sélectionnée
                                handleSuggestSelection(selectedOption);
                            }}
                            value={null} // Assurez-vous que la valeur soit null au début
                            placeholder="Sélectionnez une suggestion"
                            isSearchable={true}
                        />

                        <div className="itinerary">
                            <h2>Itinéraire</h2>
                            <ul>
                                {itinerary.map((item, index) => (
                                    <li key={index}>
                                        {item.properties.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
        </>
    )

}

export default Itineraries;