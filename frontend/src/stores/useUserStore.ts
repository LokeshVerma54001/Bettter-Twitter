import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios"
import { AxiosError } from "axios";
import { error } from "console";

export const useUserStore = create((set, get) =>({
    user:null,
    loading:false,
    checkingAuth: true,

    signup: async ({name, username, email, password, confirmPassword}) => {
        set({loading: true});
        if(password !== confirmPassword){
            set({loading: false});
            return toast.error("Passwords do not match");
        }
        try {
            const res = await axios.post('/auth/signup', {name, username, email, password});
            set({user: res.data, loading: false});
        } catch (err) {
            set({ loading: false });
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    login: async (email, password) =>{
        set({loading:true});
        try {
            const res = await axios.post('/auth/login', {email, password});
            set({user: res.data, loading: false});
        } catch (err) {
            set({ loading: false });
            const error = err as AxiosError<{ message: string }>;
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    logout: async () =>{
        try {
            await axios.post('/auth/logout');
            set({user: null});
        } catch (err) {
            const error = err as AxiosError<{message: string}>;
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    checkAuth: async () =>{
        set({checkingAuth: true});
        try {
            const response = await axios.get('/auth/profile');
            set({user: response.data, checkingAuth: false});
        } catch (err) {
            set({checkingAuth: false, user: null});
            console.log(err);
        }
    },

    refereshToken: async () => {
        // if already auth to prevent multiple simultaneous referesh attempts
        if(get().checkingAuth) return;
        set({checkingAuth: true});
        try {
            const response = await axios.post("/auth/referesh-token");
            set({checkingAuth: false});
            return response.data;
        } catch (error) {
            set({user: null, checkingAuth: false});
            throw error;
        }
    },

}));

//Axios interceptor for token referesh
let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);