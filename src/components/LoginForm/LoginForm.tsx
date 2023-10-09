import axios from 'axios';
import RegistrationForm from "../registrationForm/RegistrationForm";
import "./LoginForm.css";
import { useState, useEffect } from 'react';

function LoginForm({ show, toggleLogin, onUserLogin }) {

    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            setEmail('');
            setPassword('');
            setError('');
        }
    }, [show]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');


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
            toggleLogin()
            onUserLogin(userData);
            setError('');
            setPassword('');
            setError('');
            onUserLogin(userData);
            console.log("ok");
            console.log("Token reçu:", token);
            console.log("Données utilisateur:", userData);
            
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
                
                <form onSubmit={handleLogin}>
                    <input className="input-texte" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="input-texte" type="password" placeholder="mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <p className='error-msg'>{error}</p>
                    
                    <input className="input-submit" type="submit" value="connexion" />
                </form>
                <button className="registration-btn" onClick={toggleRegistration}>inscription</button>
            </div>
            <RegistrationForm show={showLogin} toggleLogin={toggleRegistration}/>
        </div>
    );
}

export default LoginForm;