import banquise from '../../assets/banquise.jpg';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className="page-container">
            <h1 className="titre">404 - Page non trouvée</h1>
            <div className="image-container">
            <img src={banquise} alt="Banquise" />
            <p className="centered-text">Désolé, la page que vous cherchez n'existe pas.</p>
        </div>
        </div>

    );
}

export default PageNotFound;