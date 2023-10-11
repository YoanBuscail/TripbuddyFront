<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer/Footer';
import UserInfo from "../components/UserInfo/userInfo";
import ActionButton from "../components/actionButtonProfile/ActionButtonProfile";
import PopupLogout from "../components/PopupLogout/PopupLogout";

=======
import { useState, useEffect } from "react";  // Ajoutez useEffect
import Footer from '../components/footer/Footer';
import UserInfo from "../components/userInfo/userInfo";
import PopupLogout from "../components/popupLogout/PopupLogout";
import Navbar from "../components/navbar/Navbar";
import MyItineraries from "../components/myItineraries/myItineraries";
import ActionButtonProfile from "../components/actionButtonProfile/ActionButtonProfile";
>>>>>>> fc459f7e20460e406c22a594be9f8d52f2971158

function UserProfile() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [userData, setUserData] = useState(null);  // Ajoutez cet état pour stocker les données utilisateur
    

    // Récupérez les données utilisateur du localStorage
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    

    const handleConfirm = () => {
        console.log("Le compte a été supprimé");
    };

    return (
<<<<<<< HEAD
        <div className="profil-container">
            <h1>Bonjour</h1>
            <UserInfo />
            <ActionButton label="Déconnexion" onClick={handleLogout} />
            <ActionButton label="Supprimer le compte" onClick={() => setPopupOpen(true)} />
            {isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
            <Footer />
        </div>
    );
=======
        <>
            <div className="profil-container">
            <Navbar />
                {userData && <UserInfo userData={userData} />}  {/* N'affiche UserInfo que si userData est disponible */}
                

            <MyItineraries />
            <ActionButtonProfile className="delete-button " label="Supprimer le compte" onClick={() => setPopupOpen(true)} />
                {isPopupOpen && <PopupLogout onClose={() => setPopupOpen(false)} onConfirm={handleConfirm}/>}
            <Footer />    
            </div>

            
        </>
    );  
>>>>>>> fc459f7e20460e406c22a594be9f8d52f2971158
}

export default UserProfile;
