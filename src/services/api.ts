import axios from "axios";

const api = axios.create({
    baseURL: 'http://200.132.198.137:3333'
})

export default api;