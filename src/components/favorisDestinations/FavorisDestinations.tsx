import "./FavorisDestinatons.css"
import kayak from '../../assets/kayak.jpg'

function FavorisDestination(){

    return(

        <section className="section-favoris">
            <h2 className="title-favorites">Nos destinations favorites</h2>
            <div className="container-favoris-cards">
                <div className="favoris-card">
                    <img className="img-favoris" src={kayak} alt="logo-img"/>
                    <p className="activity-name">Kayak</p>
                    <p className="city-favoris-card">Brest</p>
                    <p className="category-favoris-card"> aquatique</p>
                </div>
                <div className="favoris-card">
                    <img className="img-favoris" src={kayak} alt="logo-img"/>
                    <p className="activity-name">Kayak</p>
                    <p className="city-favoris-card">Brest</p>
                    <p className="category-favoris-card"> aquatique</p>
                </div>
                <div className="favoris-card">
                    <img className="img-favoris" src={kayak} alt="logo-img"/>
                    <p className="activity-name">Kayak</p>
                    <p className="city-favoris-card">Brest</p>
                    <p className="category-favoris-card"> aquatique</p>
                </div>
            </div>
        </section>

    )


}

export default FavorisDestination