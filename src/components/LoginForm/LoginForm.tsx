import axios from 'axios';
import RegistrationForm from "../registrationForm/RegistrationForm";
import "./LoginForm.css";
import { useState } from 'react';

function LoginForm({ show, toggleLogin, onUserLogin }) {

    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://tripbuddy.sc3wect2718.universe.wf/api/login_check',
                {
                    username: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            const token = response.data.token;
            const userData = response.data.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            onUserLogin(userData);
            console.log("ok");
            console.log("Token reçu:", token);
        console.log("Données utilisateur:", userData);
            // Redirection ou mise à jour de l'état de l'application
        } catch (err) {
            if (err.response && err.response.data) {
                console.error("Erreur détaillée:", err.response.data);
            }
            setError('Erreur de connexion. Vérifiez vos identifiants.');
        }
    };

    const toggleRegistration = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            <div className={show ? "login-form show" : "login-form"}>
                <span className="close-btn" onClick={toggleLogin}>&times;</span>
                <h2>Connexion</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input className="input-texte" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input-texte" type="password" placeholder="mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <input className="input-submit" type="submit" value="connexion" />
                </form>
                <button className="registration-btn" onClick={toggleRegistration}>inscription</button>
            </div>
            <RegistrationForm show={showLogin} toggleLogin={toggleRegistration}/>
        </div>
    );
}

export default LoginForm;