import "./myItineraries.css"
import kayak from '../../assets/kayak.jpg'
import { useItineraries } from "../../hooks/useItineraries";


function MyItineraries(){
    const itineraries = useItineraries()
    return(
    <section className="my-itineraries">
    <h2>Mes itinéraires</h2>
    <div className="container-profile-cards">
        {itineraries?.map((itinerary:any) => (
            <div className="profile-card" key={`itinerary-${itinerary.id}`}>
            <img className="img-profile-card" src={kayak} alt="logo-img"/>
            <p className="profile-card-name">{itinerary.title}</p>
            <p className="profile-card-description">{itinerary.description}</p>
            <p className="profile-card-date">{new Date(itinerary.startDate).toLocaleString('fr', { dateStyle: "short"})} au {new Date(itinerary.endDate).toLocaleString('fr', { dateStyle: "short"})}</p>
        </div>
        ))}
    </div>
    </section>
)}

export default MyItineraries;