import { Task, User } from "../common/interface";
import axios from "./axios";

const endpoint = {
    task: "task",
    category: "category",
    signup: "signup",
    login: "login"
}


// Task
const TASK_API = {
    apiGetTasks: async (userId: number) => {
        try {
            const response = await axios.get(`/${endpoint.task}/${userId}`);
            return response.data.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
    apiCreateTask: async (data: Task) => {
        try {
            console.log('data: ', data);
            const response = await axios.post(`/${endpoint.task}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
    apiUpdateTask: async (data: Task) => {
        try {
            const response = await axios.put(`/${endpoint.task}/${data.taskId}`, data);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
    apiDeleteTask: async (taskId: number) => {
        try {
            const response = await axios.delete(`/${endpoint.task}/${taskId}`);
            return response.data;
        } catch (error) {
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
            throw new Error(error as any);
        }
    },

    apiGetMe: async () => {
        try {
            const response = await axios.post(`/auth/me`);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    }
}
export {
    TASK_API,
    CATEGORY_API,
    AUTH_API
};