import { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm'
import logoTripbuddy from "../../assets/TripBuddy-logo.png"
import { useEffect } from 'react';

function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const toggleNav = () => {
        setShowNav(!showNav);
    };
    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const updateUserData = (data) => {
        setUserData(data);
    };

    useEffect(() => {
        
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            } else {
                setUserData(null); // Mettez à jour l'état si l'utilisateur est déconnecté
            };
    }, []);
    

    return (
        <>
            <header>
                <nav className={`navbar dark-mode ${showNav ? 'show-nav' : ''}`} role="navigation">
                    <div className="navbar__logo"><img className='img-logo' src={logoTripbuddy} alt="logo trip buddy"/></div>
                    <ul className="navbar__links">
                        <NavLink to="/" className= "navlink">
                            <li className="navbar__link first">
                                Accueil
                            </li>
                        </NavLink>
                        <NavLink to="/itineraires" className= "navlink">
                            <li className="navbar__link second">
                                itinéraires
                            </li>
                        </NavLink>
                        <NavLink to="/prepare-ton-voyage" className= "navlink">
                            <li className="navbar__link third">
                                Bien préparer son voyage
                            </li>
                        </NavLink>
                    </ul>
                    
                    { userData 
                      ? <NavLink to="/profil" ><button className='login-btn'>Profil</button></NavLink>
                      : <button className='login-btn' onClick={toggleLogin}>connexion</button>
                    }
                    
                    <button className="burger" onClick={toggleNav}>
                        <span className="bar"></span>
                    </button>
                </nav>
                <LoginForm show={showLogin} toggleLogin={toggleLogin} onUserLogin={updateUserData} />
            </header>
        </>
    );
}

export default Navbar;

