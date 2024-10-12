import axios from 'axios';

const API_URL = 'http://185.251.91.245:5000/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
