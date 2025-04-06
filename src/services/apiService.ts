import axios, { AxiosInstance } from "axios";

const apiService: AxiosInstance = axios.create({
    baseURL: "https://www.skyscanner.net/g/",
    timeout: 60000, 
    headers: {
        "Content-Type": "application/json",
    },
});

export { apiService };
