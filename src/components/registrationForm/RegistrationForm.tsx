import "./RegistrationForm.css"
function RegistrationForm({ show, toggleLogin }) {
    return (
        <div>
                
                <div className={show ? "login-form show" : "login-form"}>
                        <span className="close-btn" onClick={toggleLogin}>&times;</span>
                        <h2>Inscription</h2>
                        <form>
                            <input className="input-texte" type="text" placeholder= "nom" />
                            <input className="input-texte" type="text" placeholder="prénom" />
                            <input className="input-texte" type="email" placeholder="email" />
                            <input className="input-texte" type="password" placeholder="mot de passe" />
                            <input className="input-submit" type="submit" value="créer" />
                        </form>

                    </div>
                
            
        </div>
    );
}

export default RegistrationForm;