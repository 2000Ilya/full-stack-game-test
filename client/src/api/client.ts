import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_API_URL;

export default axios.create({
    baseURL: baseUrl,
});