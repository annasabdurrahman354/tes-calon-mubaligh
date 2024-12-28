import axios from 'axios';

const api = axios.create({
    baseURL: 'http://rntwg-110-138-96-64.a.free.pinggy.link/api/',
});

// Function to set the Authorization header
export const setAuthToken = (token:  string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const removeAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};

export default api;