import React from 'react';
import './Itinerary.css'

interface ItineraryProps {
    src: string;
    alt: string;
    nom: string;
    dateDebut: string;
    dateFin: string;
}

function Itinerary({ src, alt, nom, dateDebut, dateFin }: ItineraryProps) {
    return (
        <div className="itineraire-item">
            <div className='image-container'>
            <img src={src} alt={alt} className='itineraire-image' />
            </div>
            <p>{nom}</p>
            <p>{dateDebut}  {dateFin}</p>
        </div>
    );
}

export default Itinerary;

