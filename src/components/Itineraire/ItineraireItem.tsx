import React from 'react';
import voyage from '../../assets/voyage.png';
import './ItineraireItem.css'

interface ItineraireItemProps {
    src: string;
    alt: string;
    nom: string;
    dateDebut: string;
    dateFin: string;
}


function ItineraireItem({ src, alt, nom, dateDebut, dateFin }: ItineraireItemProps) {
    return (
        <div className="itineraire-item">
            <div className='image-container'>
            <img src={voyage} alt={alt} className='itineraire-image' />
            </div>
            <p>{nom}</p>
            <p>{dateDebut} - {dateFin}</p>
        </div>
    );
}

export default ItineraireItem;
