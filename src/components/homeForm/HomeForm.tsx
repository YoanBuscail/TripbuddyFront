import "./HomeForm.css"
import backgroundVideoHomeForm from "../../assets/fire.mp4";
import { Link } from 'react-router-dom';


function HomeForm() {
    return (
        <>
        <section className="home-form-itineraries">
        <video className="background-video-home-form" width="" height="" autoPlay loop muted>
                <source src={backgroundVideoHomeForm} type="video/mp4" />
                Votre navigateur ne prend pas en charge les vidéos.
            </video>

            
            <div className="search-form-home">
            <form action="">
                <input className="search-form-home-input-text" type="text"  placeholder= "recherche ta destination"/>
                <input className="search-form-home-input-text home-category"  type="text"  placeholder= "choisi la catégorie"/>
                <Link to="/itineraires">
                    <button className="search-form-home-submit">GO</button>
                </Link>
                
            </form>
            </div>
           
        </section>
        </>
    )
}

export default HomeForm;