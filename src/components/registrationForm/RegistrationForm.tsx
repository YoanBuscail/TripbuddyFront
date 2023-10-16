import axios from 'axios';
import { useState, useEffect } from 'react';
import "./RegistrationForm.css";

function RegistrationForm({ show, toggleLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);



    const handleRegistration = async (e) => {
        e.preventDefault();

        
        try {
            const response = await axios.post('http://tripbuddy.sc3wect2718.universe.wf/api/users', {
                firstname: firstName,
                lastname: lastName,
                email,
                password
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Inscription réussie:', response.data);


           
             // Fermer la popup d'inscription
             toggleLogin();
            // Forcer un reflow pour que la transition commence
        setTimeout(() => {
            // Afficher le message de succès
            setShowSuccessMessage(true);
        }, 0);
        } catch (err) {
            console.error('Erreur d\'inscription:', err);
        }
    };

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    return (
        <div>
            <div className={show ? "login-form show" : "login-form"}>
                <span className="close-btn" onClick={toggleLogin}>&times;</span>
                <h2>Inscription</h2>
                <form onSubmit={handleRegistration}>
                    <input 
                        className="input-texte" 
                        type="text" 
                        placeholder="nom" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <input 
                        className="input-texte" 
                        type="text" 
                        placeholder="prénom" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <input 
                        className="input-texte" 
                        type="email" 
                        placeholder="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        className="input-texte" 
                        type="password" 
                        placeholder="mot de passe" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <input 
                        className="input-submit" 
                        type="submit" 
                        value="créer"
                    />
                </form>
            </div>

                 <h2  className={`success-message ${showSuccessMessage ? 'show-success-message' : ''}`}>
        I           nscription réussie
                </h2>
        </div>
    );
}

export default RegistrationForm;