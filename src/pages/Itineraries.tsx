import Navbar from "../components/navbar/Navbar";
import { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import client from '../api/map-api/client'
import { useSessionToken } from "../hooks/useSessionToken"
import { useCategories } from "../hooks/useCategories"
import Select from 'react-select';
import { getSuggestions } from '../api/search-api/suggestions';
import { getRetrieve } from "../api/search-api/retrieve";
import { getDirections } from "../api/search-api/directions";
import axios from "axios";

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

    // State pour stocker les directions
    const [directions, setDirections] = useState<any>(null);

    // state pour stocker les marqueurs associés aux villes de l'itinéraire
    const [markers, setMarkers] = useState<any[]>([]);

    // state pour afficher ou non la modale d'enregistrement
    const [showSaveModal, setShowSaveModal] = useState(false);

    // state pour stocker le nom de l'itinéraire
    const [itineraryName, setItineraryName] = useState('');

    // state pour stocker la description de l'itinéraire
    const [itineraryDescription, setItineraryDescription] = useState('');

    
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
          .addTo(map.current!);
      
        const addDestination = async () => {
          const updatedItinerary = [...itinerary, retrieveSuggestion.features[0]];
          setItinerary(updatedItinerary);
          addLineToMap(updatedItinerary);
          setMarkers([...markers, marker]);

            /* // Créez un objet de type "step" pour cette destination
            const step = {
                name: retrieveSuggestion.features.properties.name,
                coordinates: retrieveSuggestion.features.geometry.coordinates,
            };
 */
            // Ajoutez cette étape à l'itinéraire
            /* updatedItinerary.push(step); */
          
            getDirectionsFromMapboxAPI();
        };

        const getDirectionsFromMapboxAPI = async () => {
            if (itinerary.length >= 2) {
                const coordinates = itinerary.map((item) => item.geometry.coordinates);
                console.log("Coordonnées de l'itinéraire:", coordinates);
        
                try {
                    const directionsData = await getDirections(coordinates);
        
                    // Update the directions state with the API response
                    setDirections(directionsData);
        
                    console.log('Itinéraire de Mapbox API:', directionsData);
                } catch (error) {
                    console.error('Erreur lors de la récupération de l\'itinéraire:', error);
                }
            }
        };
      
        const name = retrieveSuggestion.features[0].properties.name;
        const address = retrieveSuggestion.features[0].properties.address;
        const placeFormatted = retrieveSuggestion.features[0].properties.place_formatted;
      
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
      

      const addLineToMap = (itinerary) => {
        if (map.current) {
          const mapInstance = map.current;
      
          if (mapInstance.getSource('line-source')) {
            mapInstance.removeLayer('line-layer');
            mapInstance.removeSource('line-source');
          }
      
        const coordinates = itinerary.map((item) => item.geometry.coordinates);
      
        mapInstance.addSource('line-source', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates,
                },
                properties: {},
            },
        });
      
          mapInstance.addLayer({
            id: 'line-layer',
            type: 'line',
            source: 'line-source',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#0074D9',
              'line-width': 4,
              'line-translate': [0, 10],
            }});
        }
      };
      
    const lineCoordinates = [];
    itinerary.forEach((item) => {
        lineCoordinates.push(item.geometry.coordinates);
        console.log(lineCoordinates);
        
    });

    // Fonction pour supprimer une ville de l'itinéraire
    const removeDestination = (index) => {
        const updatedItinerary = [...itinerary];
        const updatedMarkers = [...markers];
    
        if (index >= 0 && index < updatedItinerary.length && index < updatedMarkers.length) {
            // Supprimez le marqueur associé à cette ville
            updatedMarkers[index].remove();
    
            updatedItinerary.splice(index, 1);
            updatedMarkers.splice(index, 1);
    
            // Mettez à jour l'itinéraire et les marqueurs
            setItinerary(updatedItinerary);
            setMarkers(updatedMarkers);
    
            // Mettez à jour le tracé sur la carte
            addLineToMap(updatedItinerary);
        }
    };

    const openSaveModal = () => {
        setShowSaveModal(true);
    };

    const closeSaveModal = () => {
        setShowSaveModal(false);
    };
    
    const saveItinerary = async () => {
        try {

            const authToken = localStorage.getItem('token');
            const data = {
                title: itineraryName,
                /* startDate: itineraryStartDate,
                endDate: itineraryEndDate,
                favorite: itineraryFavorite, */
                steps: itinerary.map((step) => ({
                    name: step.properties.name,
                    coordinates: step.geometry.coordinates,
                })),
            };

            console.log('Data to be sent:', data);
    
            const headers = {
                Authorization: `Bearer ${authToken}`,
            };
    
            const response = await axios.post('http://tripbuddy.sc3wect2718.universe.wf/api/itineraries', data, { headers });
    
            // Traitez la réponse de l'API (par exemple, affichez un message de succès)
            console.log('Itinéraire créé:', response.data);
        } catch (error) {
            // Gérez les erreurs (par exemple, affichez un message d'erreur)
            console.error('Erreur lors de la création de l\'itinéraire:', error);
        }
        
        // Une fois l'enregistrement terminé, fermez la modal.
        closeSaveModal();
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
                                        <button onClick={() => removeDestination(index)}>Supprimer</button>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={openSaveModal}>Enregistrer l'itinéraire</button>
                        </div>

                        {showSaveModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Enregistrer l'itinéraire</h2>
                                <input
                                    type="text"
                                    placeholder="Nom de l'itinéraire"
                                    value={itineraryName}
                                    onChange={(e) => setItineraryName(e.target.value)}
                                />
                                <textarea
                                    placeholder="Description de l'itinéraire"
                                    value={itineraryDescription}
                                    onChange={(e) => setItineraryDescription(e.target.value)}
                                />
                                <button onClick={saveItinerary}>Sauvegarder</button>
                                <button onClick={closeSaveModal}>Annuler</button>
                            </div>
                        </div>
                    )}

                    </div>
                </div>
        </>
    )

}

export default Itineraries; 