const mockTasks = [
    {
        taskId: 1,
        title: "Complete React project",
        categoryId: 2,
        time: new Date("2025-03-26T10:00:00"),
        isCompleted: false,
        userId: "user123",
        nameCategory: "Work",
        color: "#FF5733"
    },
    {
        taskId: 2,
        title: "Buy groceries",
        categoryId: 1,
        time: new Date("2025-03-26T18:30:00"),
        isCompleted: false,
        userId: "user123",
        nameCategory: "Personal",
        color: "#33FF57"
    },
    {
        taskId: 3,
        title: "Attend team meeting",
        categoryId: 2,
        time: new Date("2025-03-26T14:00:00"),
        isCompleted: true,
        userId: "user456",
        nameCategory: "Work",
        color: "#FF5733"
    },
    {
        taskId: 4,
        title: "Go to the gym",
        categoryId: 3,
        time: new Date("2025-03-26T07:00:00"),
        isCompleted: false,
        userId: "user789",
        nameCategory: "Health",
        color: "#337BFF"
    },
    {
        taskId: 5,
        title: "Read a book",
        categoryId: 1,
        time: null,
        isCompleted: false,
        userId: "user123",
        nameCategory: "Personal",
        color: "#33FF57"
    }
];

export default mockTasks;
