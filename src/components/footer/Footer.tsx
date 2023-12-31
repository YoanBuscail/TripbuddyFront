import './Footer.css'; 
import { Link } from 'react-router-dom';

function Footer () {
  return (
    <footer className="footer">
      <p>© 2023 TripBuddy. Tous les droits sont réservés.</p>
      <Link to="/mentions-legales" className='link-footer'>Mentions Légales</Link> 
   </footer>
  );
}

export default Footer;
