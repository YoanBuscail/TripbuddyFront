import Navbar from "../components/navbar/Navbar";
import { useEffect, useRef} from 'react'
import type {Map} from 'mapbox-gl'
import client from '../map-api/client'


function Itineraries(){
    const styleObject = {
        height: '100vh',
      };

      // référence qui contiendra la div destinée à contenir la map
      const mapContainer = useRef<HTMLDivElement | null>(null)
      // référence qui contiendra l'object Map qu'on va créer
      const map = useRef<Map | null>(null)
    
    useEffect(() => {
        if(mapContainer.current && !map.current) {
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
      
    return(
        <>
            <Navbar />
            <div className="map-parent" style={styleObject}>
                <div ref={mapContainer} className="containe-map" style={styleObject}/>
            </div>
        </>
    ) 

}

export default Itineraries;