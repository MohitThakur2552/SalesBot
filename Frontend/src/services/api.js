import axios from "axios";

const api = axios.create({

    baseURL: "https://salesbot-p3pq.onrender.com"

});

export default api;