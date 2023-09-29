import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer/Footer';
import UserInfo from "../components/userInfo/userInfo";
import ActionButton from "../components/actionButtonProfile/ActionButtonProfile";
import PopupLogout from "../components/popupLogout/PopupLogout";
import Itinerary from "../components/itinerary/Itinerary";

function Profile() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleConfirm = () => {
        console.log("Le compte a été supprimé");
    };

    return (
        <div className="profil-container">
            <h1>Bonjour</h1>
            <UserInfo />
            <Itinerary />
            <ActionButton label="Déconnexion" onClick={handleLogout} />
            <ActionButton label="Supprimer le compte" onClick={() => setPopupOpen(true)} />
            {isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
            <Footer />
        </div>
    );
}

export default Profile;
