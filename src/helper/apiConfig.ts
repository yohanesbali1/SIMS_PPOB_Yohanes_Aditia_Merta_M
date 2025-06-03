import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

let axiosInstance: AxiosInstance | null = null;

export default function apiClient(): AxiosInstance {
    if (axiosInstance) return axiosInstance;

    const token: string | undefined = Cookies.get("token");

    axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        responseType: "json",
        headers: {
            Accept: "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response?.status === 401 &&
                typeof window !== "undefined" &&
                window.location.pathname !== "/"
            ) {
                Cookies.remove("token");
                localStorage.clear();
                window.location.href = "/";
            }
            // Uncomment to handle 429
            // if (error.response?.status === 429) {
            //   Swallalert('error', error.response.data);
            // }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}
