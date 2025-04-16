import { ISubTask, User } from "../common/interface";
import axiosInstance from "./axios";
import { HOST_BACKEND } from "./constants";

const endpoint = {
    task: "task",
    category: "category",
    signup: "signup",
    login: "login",
    user: "user",
};

// SUB TASK
const SUB_TASK_API = {
    getAllSubTasks: async (userId: number) => {
        try {
            const response = await axiosInstance.get(`/${endpoint.task}/sub/${userId}`);
            return { statusCode: 200, data: response.data.data };
        } catch (error) {
            console.error("check error: ", error);
            throw new Error(error as any);
        }
    },

    apiPostSubTask: async (data: ISubTask) => {
        try {
            const response = await axiosInstance.post(`/${endpoint.task}/sub`, data);
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.error("check error: ", error);
            throw new Error(error as any);
        }
    },

    apiUpdateSummarize: async (id: number, summarize: string) => {
        try {
            const response = await axiosInstance.put(`/${endpoint.task}/sub/${id}`, { summarize });
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.error("check error: ", error);
            throw new Error(error as any);
        }
    },

    apiDeleteSubTask: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/${endpoint.task}/sub/${id}`);
            return { statusCode: 200, data: response.data };
        } catch (error) {
            throw new Error(error as any);
        }
    },
};

// CATEGORY
const CATEGORY_API = {
    apiGetCategories: async () => {
        try {
            const response = await axiosInstance.get(`/${endpoint.category}`);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
};

// AUTH
const AUTH_API = {
    apiSignUp: async (user: User) => {
        try {
            const response = await axiosInstance.post(`/auth/${endpoint.signup}`, user);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },

    apiLogin: async (user: User) => {
        try {
            const response = await axiosInstance.post(`/auth/${endpoint.login}`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    apiLogout: async () => {
        try {
            return await axiosInstance.post(`/auth/logout`);
        } catch (error) {
            throw error;
        }
    },

    apiGetMe: async () => {
        try {
            const response = await axiosInstance.get(`/auth/me`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    apiGetUsers: async (userId: number) => {
        try {
            const response = await axiosInstance.get(`/user/list/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    apiLoginWithGoogle: () => {
        window.location.href = `${HOST_BACKEND}/auth/oauth2`;
    }
};

export {
    CATEGORY_API,
    AUTH_API,
    endpoint,
    SUB_TASK_API
};
