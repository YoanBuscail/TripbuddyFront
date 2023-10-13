import React from 'react';
import './PopupLogout.css';

interface PopupLogoutProps {
    onClose: () => void; 
    onConfirm: () => void; 
}

function PopupLogout({ onClose, onConfirm }: PopupLogoutProps) {
    return (
    <div className='popup-overlay'>
        <div className='popup'>
        <p>Etes-vous sûr de vouloir supprimer votre compte?</p>
         <button onClick={onClose}>Annuler</button>
         <button onClick={() => {
            onConfirm();
            onClose();
         }}>Confirmer</button>
        </div>
        </div>
    );
        }


export default PopupLogout;