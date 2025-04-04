import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../common/interface";
import axios from "../api/axios";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    total: number
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
    total: 0
}

const endpoint = {
    task: "task",
    category: "category",
    signup: "signup",
    login: "login",
    user: "user",
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId: number, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/${endpoint.task}/${userId}`);
        return response?.data?.data;
    } catch (error: any) {
        return rejectWithValue(error.meesage)   
    }
})

// Async Thunk để tạo task
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData: any, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/${endpoint.task}`, taskData);
            if (response?.status !== 201) throw new Error("Failed to create task");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk để update task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/${endpoint.task}/${data.taskId}`, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


// Async Thunk để xóa task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId: number, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/${endpoint.task}/${taskId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskOptimistic: (state, action) => {
            state.tasks = state.tasks.filter(task => task.taskId !== action.payload);
            state.total = state.tasks.length
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload,
                state.total = action.payload.length
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default taskSlice.reducer;
export const { removeTaskOptimistic } = taskSlice.actions;

