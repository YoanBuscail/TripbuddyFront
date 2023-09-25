import React, {useState} from "react";
import PopupLogout from "../components/Popup/PopupLogout";
import './Profil.css';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import ItineraireItem from "../components/Itineraire/ItineraireItem";


interface User {
    nom: string;
    prenom: string;
    email: string;
}

function Profil() {
    const [user, setUser] = useState<User>({ nom: 'Nom', prenom:'Prenom', email:'Email' })
    const [isPopupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
 
    const handleConfirm = () => {
        console.log("Le compte a été supprimé");
    }

    const handleLogout = () => {
        navigate('/');
    }

    const itineraires = [
        { src: "image1.jpg", alt: "Itinéraire 1", nom: "Nom de l'itinéraire 1", dateDebut: "Date de début", dateFin: "Date de fin" },
        { src: "image2.jpg", alt: "Itinéraire 2", nom: "Nom de l'itinéraire 2", dateDebut: "Date de début", dateFin: "Date de fin" },
        { src: "image3.jpg", alt: "Itinéraire 3", nom: "Nom de l'itinéraire 3", dateDebut: "Date de début", dateFin: "Date de fin" }
      ];

      const [isEditing, setIsEditing] = useState(false);

 return (
    <div className="profil-container">
        <h1>Bonjour, {user.prenom}</h1>
        <div className="user-info-container">
        <div className="info-container">
    {isEditing ? (
        <>
            <label>
                Nom: 
                <input type="text" value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} />
            </label>
            <label>
                Prenom: 
                <input type="text" value={user.prenom} onChange={(e) => setUser({...user, prenom: e.target.value})} />
            </label>
            <label>
                Email: 
                <input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
            </label>
            <button onClick={() => setIsEditing(false)}>Valider</button>
        </>
    ) : (
        <>
            <p>Nom: {user.nom}</p>
            <p>Prenom: {user.prenom}</p>
            <p>Email: {user.email}</p>
        </>
    )}
</div>

          
            <button className="modifier-button" onClick={() => setIsEditing(true)}>Modifier</button>

    </div>
    <button className="deconnexion-button" onClick={handleLogout}>Déconnexion</button>

<h2>Mes itinéraires</h2>

<div className="itineraire-container">
  {itineraires.map((itineraire, index) => (
    <ItineraireItem key={index} {...itineraire} />
  ))}
</div>


   <button className="supprimer-button" onClick={() => setPopupOpen(true)}>Supprimer le compte</button>

{isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
</div>

);
}


export default Profil;