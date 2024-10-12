import axios from 'axios';

const API_URL = 'https://185.251.91.245/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
