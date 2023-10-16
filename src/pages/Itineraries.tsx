import Navbar from "../components/navbar/Navbar";
import MapItineraries from "../components/mapItineraries/MapItineraries";
import { useSearchParams } from "react-router-dom";


function Itineraries() {
    const [searchParams] = useSearchParams()
    const categoryId = searchParams.get("categoryId")
    const mapboxId = searchParams.get("mapboxId")

    return (
        <>
            <Navbar />
            <MapItineraries initialCategoryId={categoryId} initialMapboxId={mapboxId} />
        </>
    )

}

export default Itineraries; 