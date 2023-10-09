import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import UserInfo from "../components/UserInfo/userInfo";
import ActionButton from "../components/actionButtonProfile/ActionButtonProfile";
import PopupLogout from "../components/PopupLogout/PopupLogout";


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
            <ActionButton label="Déconnexion" onClick={handleLogout} />
            <ActionButton label="Supprimer le compte" onClick={() => setPopupOpen(true)} />
            {isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
            <Footer />
        </div>
    );
}

export default Profile;
