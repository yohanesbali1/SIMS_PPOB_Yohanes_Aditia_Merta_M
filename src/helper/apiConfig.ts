import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { decryptWithExpiry } from "../hook/useCript";


export default function apiClient(): AxiosInstance {
    // const token: string | undefined = Cookies.get("token");
    let token = "";
    const res: any = localStorage.getItem('token_enc');
    if (res) {
        const data_encpt: any = decryptWithExpiry(res);
        if (!data_encpt.expired) {
            const data = JSON.parse(data_encpt.data);
            token = data.token;
        }
    }
    const axiosInstance = axios.create({
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
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}
