import axios, { AxiosInstance } from "axios";

// Create API service instance
const apiService: AxiosInstance = axios.create({
    baseURL: "/api",
    timeout: 60000,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// Add response interceptor to handle errors
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        return Promise.reject(error);
    }
);

export { apiService };
