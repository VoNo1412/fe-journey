import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../common/interface";
import { TASK_API } from "../api/api";

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (userId: number, { rejectWithValue }) => {
    try {
        const response = await TASK_API.apiGetTasks(userId);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.meesage)   
    }
})

// Async Thunk để tạo task
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData: any, { rejectWithValue }) => {
        try {
            const response = await TASK_API.apiCreateTask(taskData);
            if (response?.statusCode !== 200) throw new Error("Failed to create task");
            return response;
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
            let check = await TASK_API.apiDeleteTaskUser(taskId);
            console.log('check del: ', check)
            return taskId; // Trả về ID task đã xóa
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
});

export default taskSlice.reducer;


