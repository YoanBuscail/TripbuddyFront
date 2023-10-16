import "./myItineraries.css";
import { useItineraries } from "../../hooks/useItineraries";
import { useEffect, useState } from "react";
import axios from "axios";

function MyItineraries() {
    const itineraries = useItineraries();
    const [randomImages, setRandomImages] = useState([]);

    useEffect(() => {
        // Fonction pour charger des images aléatoires pour chaque carte
        const fetchRandomImages = async () => {
            const imagePromises = itineraries.map(() => axios.get("https://source.unsplash.com/800x600/?landscape"));

            try {
                const imageResponses = await Promise.all(imagePromises);
                const imageUrls = imageResponses.map((response) => response.request.responseURL);
                setRandomImages(imageUrls);
            } catch (error) {
                console.error("Erreur lors du chargement des images aléatoires : ", error);
            }
        };

        fetchRandomImages();
    }, [itineraries]);

    return (
        <section className="my-itineraries">
            <h2>Mes itinéraires</h2>
            <div className="container-profile-cards">
                {itineraries?.map((itinerary, index) => (
                    <div className="profile-card" key={`itinerary-${itinerary.id}`}>
                        <img className="img-profile-card" src={randomImages[index]} alt="Image aléatoire" />
                        <div className="profile-card-name">
                            <strong>{itinerary.title}</strong>
                        </div>
                        <p className="profile-card-description">{itinerary.description}</p>
                        <p className="profile-card-date">
                            {new Date(itinerary.startDate).toLocaleString("fr", { dateStyle: "short" })} au{" "}
                            {new Date(itinerary.endDate).toLocaleString("fr", { dateStyle: "short" })}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MyItineraries;
