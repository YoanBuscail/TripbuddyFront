import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_BACK_API_URL,
});

export default client;
