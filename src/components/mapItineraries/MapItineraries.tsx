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

export default function MapItineraries({ initialCategoryId, initialMapboxId }) {
    // référence qui contiendra la div destinée à contenir la map
    const mapContainer = useRef<HTMLDivElement | null>(null)

    // référence qui contiendra l'object Map qu'on va créer
    const map = useRef<Map | null>(null)

    // State pour le message d'erreur
    const [errorMessage, setErrorMessage] = useState('');

    // State pour le message de succès
    const [successMessage, setSuccessMessage] = useState('');

    // state de la liste des suggestions
    const { suggestions, suggest } = useSuggest()

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

            // 2) si la géolocalisation est activée sur le navigateur, on centre la carte sur la position de l'utilisateur
        navigator?.geolocation?.getCurrentPosition((position) => {
            config.center = [
                position.coords.longitude,
                position.coords.latitude,
            ];

            // Mise à jour de la carte avec la nouvelle position
            map.current?.setCenter(config.center);

            // 3) on crée la map et on la stocke dans la ref prévue à cet effet
            map.current = new client.Map(config);

            // si on a déjà un mapbox id dans l'URL (ça veut dire qu'on vient de la page d'accueil), on affiche la destination correspondante
            if (initialMapboxId) {
                handleSuggestSelection(initialMapboxId);
            }
        });
        }

    }, [map.current]);

    const handleSuggestSelection = async (suggestionId: string) => {
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

            // Réinitialisez la suggestion sélectionnée
            setSelectedSuggestion(null);

            // Fermez la popup
            popup.remove();
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
        button.classList.add("btn","accent");
        button.innerHTML = "Ajouter à mon itinéraire";
        button.id = "add-to-itinerary";

        // Ajoutez un écouteur d'événement
        button.addEventListener("click", addDestination);

        // Créez votre contenu popup
        const popupContent = document.createElement("div");
        popupContent.className = "map-popup";
        popupContent.innerHTML = `
        <h3>${name}</h3>
        ${address ? `<p>${address}</p>` : ''}
        <p>${placeFormatted}</p>
        `;

        // Ajoutez le bouton au contenu
        popupContent.appendChild(button);

        const popup = new client.Popup({
            closeButton: false,
        })
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
                    'line-translate': [0, 2],
                }
            });
        }
    };

    const lineCoordinates = [];
    itinerary.forEach((item) => {
        lineCoordinates.push(item.geometry.coordinates);

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
            // Envoi de la demande au serveur
            try {
                const data = {
                    title: itineraryName,
                    startDate: itineraryStartDate,
                    endDate: itineraryEndDate,
                    steps: itinerary.map((step) => ({
                        name: step.properties.name,
                        coordinates: step.geometry.coordinates,
                    })),
                };

                const authToken = localStorage.getItem('token');

                const headers = {
                    Authorization: `Bearer ${authToken}`,
                };

                const response = await apiClient.post('/itineraries', data, { headers });

                if (response.status === 201) {
                    // La demande a réussi
                    setSuccessMessage('Votre itinéraire a bien été sauvegardé !');
                    console.log('Itinéraire créé:', response.data);

                    
                } else {
                    // La demande a échoué, affichez un message d'erreur
                    setErrorMessage('Vous devez être connecté pour enregistrer un itinéraire.');
                }
            } catch (error) {
                // Affiche un message d'erreur en cas d'erreur lors de la demande
                console.error('Erreur lors de la création de l\'itinéraire:', error);
                setErrorMessage('Vous devez être connecté pour enregistrer un itinéraire.');
            }
        } catch (error) {
            // Gère les erreurs ici...
            console.error('Erreur lors de la sauvegarde de l\'itinéraire:', error);
        }
    };

    return (
        <div className="map-parent">
            <div ref={mapContainer} className="map-container" />
            {showSaveModal ?
                (
                    <div className="itinerary-modal">
                        <h2>Enregistrer l'itinéraire</h2>
                        {errorMessage && (
                            <div className="message-error">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                                    <div className="message-success">
                                        {successMessage}
                                    </div>
                                )}
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
                        <div className='itinerary-modal__actions'>

                            <button className="btn primary" onClick={closeSaveModal}>Annuler</button>
                            <button className="btn cancel" onClick={saveItinerary}>Sauvegarder</button>
                        </div>
                        
                    </div>
                )
                :
                (
                    <div className="map-form">
                        {/* Utilise react-select pour l'autocomplétion des catégories */}
                        <Select
                            options={categories.map((item) => ({ value: item.canonical_id, label: item.name }))}
                            onChange={(selectedOption) => {
                                const selectedCategory = categories.find((item) => item.canonical_id === selectedOption?.value);
                                setCategory(selectedCategory);
                                if (selectedSuggestion) suggest(selectedSuggestion.name, selectedOption?.value)
                            }}
                            value={category ? { value: category.canonical_id, label: category.name } : null}
                            placeholder="Selectionnez une catégorie"
                            isSearchable={true} // Active la recherche dans le champ
                            styles={{ control: (provided) => ({ ...provided, fontFamily: 'Poppins, sans-serif' }), menu: (provided) => ({ ...provided, fontFamily: 'Poppins, sans-serif' })  }}
                        />

                        {/* Affiche les suggestions ici */}
                        <Select
                            value={selectedSuggestion ? { value: selectedSuggestion.mapbox_id, label: selectedSuggestion.name } : null}
                            options={suggestions?.map((suggestion) => ({ value: suggestion.mapbox_id, label: suggestion.name }))}
                            onChange={(selectedOption) => {
                                const selected = suggestions.find((suggestion) => suggestion.mapbox_id === selectedOption?.value);
                                setSelectedSuggestion(selected)
                                // Appel de la fonction de récupération des détails de la suggestion sélectionnée
                                handleSuggestSelection(selected.mapbox_id);
                            }}
                            onInputChange={(newValue) => {
                                console.log(suggestions)
                                if (newValue) suggest(newValue, category?.canonical_id)
                            }}
                            placeholder="Sélectionnez une suggestion"
                            isSearchable={true}
                            styles={{ control: (provided) => ({ ...provided, fontFamily: 'Poppins, sans-serif' }), menu: (provided) => ({ ...provided, fontFamily: 'Poppins, sans-serif' }), // Applique la police au menu
                            }}
                        />


                        <div className="itinerary-container">
                            {itinerary?.length ? (<>
                                <h2>Votre itinéraire</h2>
                               
                                <ul className="itinerary">
                                    {itinerary.map((item, index) => (
                                        <li key={index}>
                                            <p className="itinerary__name">{item.properties.name}</p><button className="delete-btn" onClick={() => removeDestination(index)}><img className="close-svg" src={closeSVG} alt="close btn" /></button>
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn accent" onClick={openSaveModal}>Enregistrer l'itinéraire</button>
                            </>)
                                :
                                (
                                    <p className="itinerary__placeholder">Aucune destination n'a encore été ajoutée...</p>
                                )
                            }
                        </div>

                    </div>
                )
            }
        </div>
    )
}
