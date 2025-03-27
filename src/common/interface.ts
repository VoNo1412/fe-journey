interface Task {
    taskId?: number;
    title: string; 
    categoryId: number | null; 
    time?: null | string;
    isCompleted: boolean;
    userId?: string;
    nameCategory?: string;
    color?: string;
    taskUserId?: number | any;
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

export type {
    IAuthContext,
    Task, 
    Category, 
    User
}