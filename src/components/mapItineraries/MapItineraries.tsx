import './MapItineraries.css'
import { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import client from '../../api/map-api/client'
import { useSessionToken } from "../../hooks/useSessionToken"
import { useCategories } from "../../hooks/useCategories"
import Select from 'react-select';

import { getRetrieve } from "../../api/search-api/retrieve";
import { getDirections } from "../../api/search-api/directions";
import apiClient from "../../api/back-api/client";
import { useSuggest } from "../../hooks/useSuggest";
import closeSVG from '../../assets/close-svg.svg'

export default function MapItineraries({initialCategoryId, initialMapboxId}) {
    // référence qui contiendra la div destinée à contenir la map
    const mapContainer = useRef<HTMLDivElement | null>(null)
    
    // référence qui contiendra l'object Map qu'on va créer
    const map = useRef<Map | null>(null)

    // state de la liste des suggestions
    const {suggestions, suggest} = useSuggest()

    // state de la liste des categories
    const categories = useCategories()

    const [selectedSuggestion, setSelectedSuggestion] = useState(null)

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

    const [itineraryStartDate, setItineraryStartDate] = useState('');

    const [itineraryEndDate, setItineraryEndDate] = useState('');

    
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

            // 3) on crée la map et on la stocke dans la ref prévue à cet effet
            map.current = new client.Map(config);

            // si on a deja un mapbox id dans l'url (ça veut dire qu'on vient de la page de d'accueil), on affiche la destination correspondante
            if(initialMapboxId) {
                handleSuggestSelection(initialMapboxId);            
            }
        }
      
    }, [map.current]);

    const handleSuggestSelection = async (suggestionId) => {
        const retrieveSuggestion = await getRetrieve(suggestionId, sessionToken);
      
        const coordinates = retrieveSuggestion.features[0].geometry.coordinates;
        console.log("Coordonnées de la suggestion:", coordinates);

        // Ajoutez un peu de marge pour que le marqueur soit centré
        const padding = { top: 50, bottom: 50, left: 50, right: 50 };

        // Utilisez la méthode flyTo pour centrer la carte sur le marqueur avec animation
        map.current?.flyTo({
            center: coordinates,
            padding: padding,
            zoom: 6,
        });
      
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

            // Mettez à jour la liste des coordonnées de l'itinéraire
            const itineraryCoordinates = updatedItinerary.map((step) => step.geometry.coordinates);

            // Calculez la boîte englobante des coordonnées de l'itinéraire
            const bounds = new client.LngLatBounds();
            itineraryCoordinates.forEach((coordinate) => {
                bounds.extend(coordinate);
            });

            // Utilisez une valeur de zoom différente en fonction du nombre d'étapes
            const zoom = updatedItinerary.length >= 2 ? 4 : 8;
            // Utilisez la boîte englobante pour centrer la carte
            map.current?.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 }, zoom: zoom });

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
        }
      
        const name = retrieveSuggestion.features[0].properties.name;
        const address = retrieveSuggestion.features[0].properties.address;
        const placeFormatted = retrieveSuggestion.features[0].properties.place_formatted;
      
        // Créez un élément bouton
        const button = document.createElement("button");
        button.innerHTML = "Ajouter à mon itinéraire";
        button.id = "add-to-itinerary";

        // Ajoutez un écouteur d'événement
        button.addEventListener("click", addDestination);

        // Créez votre contenu popup
        const popupContent = document.createElement("div");
        popupContent.innerHTML = `
        <p><strong>${name}</strong></p>
        ${address ? `<p>${address}</p>` : ''}
        <p>${placeFormatted}</p>
        `;

        // Ajoutez le bouton au contenu
        popupContent.appendChild(button);

        
        const popup = new client.Popup()
        .setDOMContent(popupContent);
      
        marker.setPopup(popup);
        };
      

        // Fonction pour ajouter le tracé de l'itinéraire sur la carte
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
                    }
                });
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
            // Supprime le marqueur associé à cette ville
            updatedMarkers[index].remove();
    
            updatedItinerary.splice(index, 1);
            updatedMarkers.splice(index, 1);
    
            // Met à jour l'itinéraire et les marqueurs
            setItinerary(updatedItinerary);
            setMarkers(updatedMarkers);
    
            // Met à jour le tracé sur la carte
            addLineToMap(updatedItinerary);
        }
    };

    const openSaveModal = () => {
        setShowSaveModal(true);
    };

    const closeSaveModal = () => {
        setShowSaveModal(false);
    };

    

    // Fonction pour enregistrer l'itinéraire
    const saveItinerary = async () => {
        try {
            const authToken = localStorage.getItem('token');
            const data = {
                title: itineraryName,
                startDate: itineraryStartDate,
                endDate: itineraryEndDate,
                steps: itinerary.map((step) => ({
                    name: step.properties.name,
                    coordinates: step.geometry.coordinates,
                })),
            };

            console.log('Data to be sent:', data);
    
            const headers = {
                Authorization: `Bearer ${authToken}`,
            };
    
            const response = await apiClient.post('/itineraries', data, { headers });
    
            // affiche un message de succès
            console.log('Itinéraire créé:', response.data);
        } catch (error) {
            // affiche un message d'erreur)
            console.error('Erreur lors de la création de l\'itinéraire:', error);
        }
        
        // Une fois l'enregistrement terminé, ferme la modal.
        closeSaveModal();
    };

  return (
    <div className="map-parent">
                <div ref={mapContainer} className="map-container" />
                    <div className="map-form">
                        {/* Utilise react-select pour l'autocomplétion des catégories */}
                        <Select
                        options={categories.map((item) => ({value: item.canonical_id, label: item.name}))}
                        onChange={(selectedOption) => {
                            const selectedCategory = categories.find((item) => item.canonical_id === selectedOption?.value);
                            setCategory(selectedCategory);
                            if(selectedSuggestion) suggest(selectedSuggestion.name, selectedOption?.value)
                        }}
                        value={category ? { value: category.canonical_id, label: category.name } : null}
                        placeholder="Selectionnez une catégorie"
                        isSearchable={true} // Active la recherche dans le champ
                        />
                        
                        {/* Affiche les suggestions ici */}
                        <Select
                            value={selectedSuggestion ? { value: selectedSuggestion.mapbox_id, label: selectedSuggestion.name } : null}
                            options={suggestions?.map((suggestion) => ({value: suggestion.mapbox_id, label: suggestion.name}))}
                            onChange={(selectedOption) => {      
                                const selected =  suggestions.find((suggestion) => suggestion.mapbox_id === selectedOption?.value);
                                setSelectedSuggestion(selected)
                                // Appel de la fonction de récupération des détails de la suggestion sélectionnée
                                handleSuggestSelection(selected.mapbox_id);
                            }}
                            onInputChange={(newValue) => {
                                console.log(suggestions)
                                if(newValue) suggest(newValue, category?.canonical_id)                                
                            }}
                            placeholder="Sélectionnez une suggestion"
                            isSearchable={true}
                        />

                        <div className="itinerary">
                            <h2>Itinéraire</h2>
                            <ul>
                                {itinerary.map((item, index) => (
                                    <li key={index}>
                                     <p>{item.properties.name}</p><button className="delete-btn" onClick={() => removeDestination(index)}><img  className="close-svg" src={closeSVG}  alt="close btn" /></button>
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
                                <input
                                    type="date"
                                    placeholder="Date de début"
                                    value={itineraryStartDate}
                                    onChange={(e) => setItineraryStartDate(e.target.value)}
                                />
                                <input
                                    type="date"
                                    placeholder="Date de fin"
                                    value={itineraryEndDate}
                                    onChange={(e) => setItineraryEndDate(e.target.value)}
                                />
                                <textarea
                                    placeholder="Description de l'itinéraire"
                                    value={itineraryDescription}
                                    onChange={(e) => setItineraryDescription(e.target.value)}
                                />
                                <button className="submit-itinerary" onClick={saveItinerary}>Sauvegarder</button>
                                <button className="cancel-itinerary"onClick={closeSaveModal}>Annuler</button>
                            </div>
                        </div>
                    )}

                    </div>
                </div>
  )
}
