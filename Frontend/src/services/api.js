import axios from "axios";

const api = axios.create({

    baseURL: "https://salesbot-69rl.onrender.com/api"

});

export default api;