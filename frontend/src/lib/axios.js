import axios from 'axios';

export const axiosinstance = axios.create({
    baseURL: 'https://chatty-bqe1.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});