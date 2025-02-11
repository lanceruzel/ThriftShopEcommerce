import axios from "axios";
import { useAuth } from "./AuthContext";

const api = axios.create({
    baseURL: "/api",
});

export const useAxiosAuth = () => {
    const { auth, login, logout } = useAuth();

    api.interceptors.request.use((config) => {
        if (auth?.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                try {
                    const refreshResponse = await axios.post("/api/auth/refresh", {
                        refreshToken: auth.refreshToken,
                    });

                    const newAuth = { ...auth, ...refreshResponse.data };
                    login(newAuth);
                    error.config.headers.Authorization = `Bearer ${newAuth.accessToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};
