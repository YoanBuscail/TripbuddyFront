import RegistrationForm from "../registrationForm/RegistrationForm";
import "./LoginForm.css"
import { useState } from 'react';

function LoginForm({ show, toggleLogin }) {

    const [showLogin, setShowLogin] = useState(false);


    const toggleRegistration = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
        
        
    };
    return (
        <div>
                
                <div className={show ? "login-form show" : "login-form"}>
                        <span className="close-btn" onClick={toggleLogin}>&times;</span>
                        <h2>Connexion</h2>
                        <form>
                            <input className="input-texte" type="text" placeholder="email" />
                            <input className="input-texte" type="password" placeholder="mot de passe" />
                            <button className="registration-btn" onClick={(e) => toggleRegistration(e)}>inscription</button>
                            <input className="input-submit" type="submit" value="connexion" />
                        </form>
                        
                    </div>
                <RegistrationForm show={showLogin} toggleLogin={toggleRegistration}/>
            
        </div>
    );
}

export default LoginForm;