import banquise from '../../assets/banquise.jpg';
import Navbar from '../navbar/Navbar';

function PageNotFound() {
    return (
        <div>
            <Navbar />
            <h1>404 - Page non trouvée</h1>
            <img src={banquise} alt="Banquise" />
            <p>Désolée, la page que vous cherchez n'existe pas.</p>
        </div>
    );
}

export default PageNotFound;