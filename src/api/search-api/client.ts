import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_MAPBOX_SEARCH_API_URL,
    });

    export default client;

const client2 = axios.create({
    baseURL: import.meta.env.VITE_MAPBOX_DIRECTIONS_API_URL,
    });

    export {client2};