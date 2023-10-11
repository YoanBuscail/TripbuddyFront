import { useState, useEffect } from "react";  // Ajoutez useEffect
import Footer from '../components/footer/Footer';
import UserInfo from "../components/userInfo/userInfo";
import PopupLogout from "../components/popupLogout/PopupLogout";
import Navbar from "../components/navbar/Navbar";
import MyItineraries from "../components/myItineraries/myItineraries";
import ActionButtonProfile from "../components/actionButtonProfile/ActionButtonProfile";

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
}

export default UserProfile;
