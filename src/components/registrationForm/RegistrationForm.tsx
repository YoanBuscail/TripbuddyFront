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
    const [validationErrors, setValidationErrors] = useState([]);

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

        /* if (password.length < 6) {
            setErrorMessage("Votre mot de passe doit contenir au minimum 6 caractères.");
            return;
        } */


        
        try {
            const response = await axios.post('http://localhost/projet-5-carnet-voyageur-back/apotheose/tripbuddy/api/users', {
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
            setValidationErrors([]); // Réinitialise les erreurs de validation
            // Fermer la popup d'inscription
            toggleLogin();
            // Forcer un reflow pour que la transition commence
            setTimeout(() => {
                // Afficher le message de succès
                setShowSuccessMessage(true);
            }, 0);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                if (err.response.data && err.response.data.errors) {
                    // Si des erreurs de validation sont retournées, les afficher
                    setValidationErrors(err.response.data.errors);
                } else {
                    // Sinon, afficher un message générique
                    setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
                }
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
                {validationErrors.length > 0 && (
                    <ul className="error-message">
                        {validationErrors.map((error, index) => (
                            <li className="error-message" key={index}>{error}</li>
                        ))}
                    </ul>
                )}
            
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