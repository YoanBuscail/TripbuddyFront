import Navbar from "../components/navbar/Navbar";
import { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import client from '../api/map-api/client'
import { useSessionToken } from "../hooks/useSessionToken"
import { useCategories } from "../hooks/useCategories"
import Select from 'react-select';
import { getSuggestions } from '../api/search-api/suggestions';


function Itineraries() {
    const styleObject = {
        height: '100vh',
    };

    const formStyle = {
        position: 'fixed',
        top: '5em',
        left: '5em',
        background: '#FFF',
        'z-index': 20,
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
    
      const handleSuggest = async (inputValue) => {
        
        console.log("Keyword:", locationName);
        console.log("Category:", category);
        // Utilisez "inputValue" comme le paramètre keyword
        const result = await getSuggestions(inputValue, category?.canonical_id);
    
        // Mise à jour de l'état des suggestions avec les résultats de la requête
        setSuggestions(result);
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
                    options={categories.map((item) => ({
                        value: item.canonical_id,
                        label: item.name,
                    }))}
                    onChange={(selectedOption) => {
                        const selectedCategory = categories.find(
                        (item) => item.canonical_id === selectedOption?.value
                        );
                        setCategory(selectedCategory);
                    }}
                    value={category ? { value: category.canonical_id, label: category.name } : null}
                    placeholder="Selectionnez une catégorie"
                    isSearchable={true} // Active la recherche dans le champ
                    />
                    {/* Afficher les suggestions ici */}
                    <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion.name}</li>
                    ))}
                    </ul>
                </div>
                </div>
        </>
    )

}

export default Itineraries;