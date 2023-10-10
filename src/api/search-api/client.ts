import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_MAPBOX_SEARCH_API_URL,
    });

    export default client;