import axios from 'axios'; 

// backendURL = 'http://34.122.134.9/';
// backendURL = 'http://localhost:3000/';

const api = axios.create({
    baseURL: 'http://34.122.134.9/',
});

/* if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
} */

export default api; 