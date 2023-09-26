import "./LoginForm.css"

function LoginForm({ show, toggleLogin }) {
    return (
        <div>
                
                <div className={show ? "login-form show" : "login-form"}>
                        <span className="close-btn" onClick={toggleLogin}>&times;</span>
                        <h2>Connexion</h2>
                        <form>
                            <input className="input-texte" type="text" placeholder="identifiant" />
                            <input className="input-texte" type="password" placeholder="mot de passe" />
                            <input className="input-submit" type="submit" value="connexion" />
                        </form>
                    </div>
                
            
        </div>
    );
}

export default LoginForm;