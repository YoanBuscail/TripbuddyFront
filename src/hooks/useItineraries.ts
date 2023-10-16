import { useEffect, useState, useMemo } from "react";
import {getItineraries} from "../api/back-api/itineraries";

export const useItineraries = () => {
    const [itineraries, setItineraries] = useState([]) as any[];
    const token = useMemo(() => window.localStorage.getItem('token'), [])

    useEffect(() => {
        if (!itineraries.length && token) {
            getItineraries(token).then((itineraries) => {
                console.log(itineraries);
                setItineraries(itineraries);
            });
        }
    }, []);

    return itineraries;
};