import { useState, useEffect } from "react";  // Ajoutez useEffect
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer/Footer';
import UserInfo from "../components/userInfo/userInfo";
import ActionButton from "../components/actionButtonProfile/ActionButtonProfile";
import PopupLogout from "../components/popupLogout/PopupLogout";
import Itinerary from "../components/itinerary/Itinerary";
import Navbar from "../components/navbar/Navbar";

function UserProfile() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [userData, setUserData] = useState(null);  // Ajoutez cet état pour stocker les données utilisateur
    const navigate = useNavigate();

    // Récupérez les données utilisateur du localStorage
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setUserData(null);  // Mettez à jour l'état local
        navigate('/');
    };

    const handleConfirm = () => {
        console.log("Le compte a été supprimé");
    };

    return (
        <div className="profil-container">
            <Navbar />
            {userData && <UserInfo userData={userData} />}  {/* N'affiche UserInfo que si userData est disponible */}
            <Itinerary />
            <ActionButton label="Déconnexion" onClick={handleLogout} />
            <ActionButton label="Supprimer le compte" onClick={() => setPopupOpen(true)} />
            {isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
            <Footer />
        </div>
    );
}

export default UserProfile;
