import { ISubTask, Task, User } from "../common/interface";
import axios from "./axios";

const endpoint = {
    task: "task",
    category: "category",
    signup: "signup",
    login: "login",
    user: "user",
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
    apiDeleteTaskUser: async (taskUserId: number) => {
        try {
            const response = await axios.delete(`/${endpoint.task}/${taskUserId}`);
            return response.data;
        } catch (error) {
            throw new Error(error as any);
        }
    },
}


const SUB_TASK_API = {
    apiPostSubTask: async (data: ISubTask) => { 
        try {
            const response = await axios.post(`/${endpoint.task}/sub`, data);
            console.log('response:', response);
            return { statusCode: 200, data: response.data };
        } catch (error) {
            console.log("check error: ", error);
            throw new Error(error as any);
        }
    },  // Get all subtasks of a task
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
    AUTH_API,
    endpoint,
    SUB_TASK_API
};