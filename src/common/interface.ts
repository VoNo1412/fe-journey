interface Task {
    taskId?: number | any;
    title: string;
    categoryId: number | null;
    time?: null | string;
    isCompleted: boolean;
    userId?: string;
    nameCategory?: string;
    color?: string;
    taskUserId?: number | any;
    subTasks?: any[] | any;
    assigned?: any;
}

interface ISubTask {
    id?: number;
    title: string;
    isCompleted?: boolean;
    taskId: number;
    status: string;
    description: string;
    summarize?: string;
    userId: number;
}

interface Category {
    categoryId: number | null;
    name: string;
    color: string;
}

interface User {
    username: string;
    password: string;
}

interface IAuthContext {
    auth: any;
    setAuth: any;
    loading: boolean;
}

interface IStatusSocket {
    userId: number;
    isOnline: boolean;
}

export type {
    IStatusSocket,
    IAuthContext,
    Task,
    Category,
    User,
    ISubTask
}