import axios from "axios";
import { useState, useEffect } from "react";
import "./UserInfo.css"

function UserInfo({ userData }) {
    const [user, setUser] = useState({ lastname: 'Nom', firstname: 'Prenom', email: 'Email' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');  // Récupérez le token du localStorage
                const response = await axios.get(`http://tripbuddy.sc3wect2718.universe.wf/api/users/${userData.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Incluez le token dans l'en-tête Authorization

                        
                    }
                });
                const fetchedUser = response.data;
                console.log(fetchedUser.lastname);
                setUser({
                    lastname: fetchedUser.lastname ,
                    firstname: fetchedUser.firstname,
                    email: fetchedUser.email 
                });
            } catch (error) {
                console.error("Une erreur est survenue lors de la récupération du profil utilisateur.", error);
            }
        };
        
        fetchUserProfile();  // Appelez la fonction pour récupérer le profil utilisateur
    }, [userData.id]);
        console.log(user)
    return (
        
        <div className="user-info-container">
            <div className="info-container">
                {isEditing ? (
                    <>
                        <label>Nom: 
                            <input type="text" value={user.nom} onChange={(e) => setUser({...user, nom: e.target.value})} />
                        </label>
                        <label>Prenom: 
                            <input type="text" value={user.prenom} onChange={(e) => setUser({...user, prenom: e.target.value})} />
                        </label>
                        <label>Email: 
                            <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
                        </label>
                        <button className="user-info-button"  onClick={() => setIsEditing(false)}>Valider</button>
                        
                        
                    </>
                ) : (
                    <>
                        <p>Nom: {user.lastname}</p>
                        <p>Prenom: {user.firstname}</p>
                        <p>Email: {user.email}</p>
                        <button className="user-info-button" onClick={() => setIsEditing(true)}>Modifier</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserInfo;