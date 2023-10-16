import axios from 'axios';
import { useState, useEffect } from 'react';
import "./RegistrationForm.css";

function RegistrationForm({ show, toggleLogin }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleClose = () => {
        toggleLogin();
        setErrorMessage(null);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
       
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setErrorMessage("Votre mot de passe doit contenir au minimum 6 caractères.");
            return;
        }


        
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
            
            setErrorMessage(null);
             // Fermer la popup d'inscription
             toggleLogin();
            // Forcer un reflow pour que la transition commence
        setTimeout(() => {
            // Afficher le message de succès
            setShowSuccessMessage(true);
        }, 0);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                // Si le code d'état est 400, on suppose que l'e-mail est déjà utilisé
                setErrorMessage("Cette adresse e-mail est déjà utilisée");
            } else {
                setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
            }
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
                <span className="close-btn" onClick={handleClose}>&times;</span>
                <h2>Inscription</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                    Inscription réussie
                </h2>
        </div>
    );
}

export default RegistrationForm;