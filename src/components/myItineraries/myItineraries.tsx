import "./myItineraries.css"
import kayak from '../../assets/kayak.jpg'


function MyItineraries(){

    return(
    
    <section className="my-itineraries">
    <h2>Mes itinéraires</h2>
    <div className="container-profile-cards">
        <div className="profile-card">
            <img className="img-profile-card" src={kayak} alt="logo-img"/>
            <p className="profile-card-name">Dev Road</p>
            <p className="profile-card-date">02/05/2023 au 17/10/2023</p>
        </div>
        <div className="profile-card">
            <img className="img-profile-card" src={kayak} alt="logo-img"/>
            <p className="profile-card-name">Dev Road</p>
            <p className="profile-card-date">02/05/2023 au 17/10/2023</p>
        </div>
        <div className="profile-card">
            <img className="img-profile-card" src={kayak} alt="logo-img"/>
            <p className="profile-card-name">Dev Road</p>
            <p className="profile-card-date">02/05/2023 au 17/10/2023</p>
        </div>

    </div>
    </section>
)};

export default MyItineraries;