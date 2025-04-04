import { ISubTask, User } from "../common/interface";
import axios from "./axios";

const endpoint = {
    task: "task",
    category: "category",
    signup: "signup",
    login: "login",
    user: "user",
}

const SUB_TASK_API = {
    getAllSubTasks: async (userId: number) => {
        try {
            const response = await axios.get(`/${endpoint.task}/sub/${userId}`);
            return { statusCode: 200, data: response.data.data };
        } catch (error) {
            console.log("check error: ", error);
            throw new Error(error as any);
        }
    },
    apiPostSubTask: async (data: ISubTask) => {
        try {
            const response = await axios.post(`/${endpoint.task}/sub`, data);
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.log("check error: ", error);
            throw new Error(error as any);
        }
    },
    apiUpdateSummarize: async (id: number, summarize: string) => {
        try {
            const response = await axios.put(`/${endpoint.task}/sub/${id}`, { summarize });
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.log("check error: ", error);
            throw new Error(error as any);
        }
    },
    apiDeleteSubTask: async (id: number) => {
        try {
            const response = await axios.delete(`/${endpoint.task}/sub/${id}`);
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.log("check error: ", error);
            throw new Error(error as any);
        }
    },
}
// category
const CATEGORY_API = {
    apiGetCategories: async () => {
        try {
            const response = await axios.get(`/${endpoint.category}`);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
}

// authen
const AUTH_API = {
    apiSignUp: async (user: User) => {
        try {
            const response = await axios.post(`/auth/${endpoint.signup}`, user);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },

    apiLogin: async (user: User) => {
        try {
            const response = await axios.post(`/auth/${endpoint.login}`, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    apiGetMe: async () => {
        try {
            const response = await axios.post(`/auth/me`);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    apiGetUsers: async () => {
        try {
            const response = await axios.get(`/user/list`);
            return response.data;
        } catch (error) {
            throw error
        }
    }
}
export {
    CATEGORY_API,
    AUTH_API,
    endpoint,
    SUB_TASK_API
};