import axios from 'axios';

const API_URL = 'https://locatorhost.yaaya.by/api';

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
