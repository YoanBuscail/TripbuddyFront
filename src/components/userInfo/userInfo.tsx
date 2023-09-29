import { useState } from "react";

function User() {
    const [user, setUser] = useState({ nom: 'Nom', prenom: 'Prenom', email: 'Email' });
    const [isEditing, setIsEditing] = useState(false);
    
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
                        <button onClick={() => setIsEditing(false)}>Valider</button>
                    </>
                ) : (
                    <>
                        <p>Nom: {user.nom}</p>
                        <p>Prenom: {user.prenom}</p>
                        <p>Email: {user.email}</p>
                        <button className="modifier-button" onClick={() => setIsEditing(true)}>Modifier</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default User;
