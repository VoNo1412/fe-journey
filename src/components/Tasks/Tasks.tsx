import { TextField, IconButton, Button, Box, InputAdornment, InputLabel, Autocomplete } from "@mui/material";
import { Send, Add, AccessTime, Event } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List } from "@mui/material";
import { Category, Task } from "../../common/interface";
import React, { useState } from "react";
import { CATEGORY_API, endpoint, TASK_API } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import TaskMenuDropdown from "./components/TaskMenuDropdown";
import useFetchQuery from "../../hooks/useFetchSearch";


export const TaskInput = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [category, setCategory] = React.useState<Category[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null); // Define the
    const { auth, setAuth } = useAuth();
    const [query, setQuery] = useState("");
    const { data } = useFetchQuery(`/${endpoint.user}/by_name`, `username=${query}`);
    const [assignToId, setAssignToId] = useState<number[]>([]);

    const [formData, setFormData] = React.useState({
        title: "",
        categoryId: null as null | number,
        isCompleted: false,
        assignToId: [] as number[]
    });


    React.useEffect(() => {
        if (!auth?.user?.userId) return;
        const fetchGetTasks = async () => await TASK_API.apiGetTasks(auth.user.userId);

        fetchGetTasks()
            .then((res) => {
                setTasks(res);
                setAuth({ ...auth, totalTasks: res.totalTasks });
            })
            .catch((err) => {
                console.log(err);
            });

        const fetchGetCategories = async () => await CATEGORY_API.apiGetCategories();
        fetchGetCategories()
            .then((res) => {
                setCategory(res);
                setFormData({ ...formData, categoryId: res[0].categoryId })
            })
            .catch((err) => {
                console.log(err);
            });
    }, [auth?.user?.userId]); // Chỉ chạy khi userId thay đổi

    const handleSubmitTask = async (e: any) => {
        e.preventDefault();
        try {
            const data = await TASK_API.apiCreateTask({ ...formData, userId: auth.user.userId, });
            if (data?.statusCode !== 200) return;
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            setTasks((prevTasks) => [...prevTasks, { ...formData, taskId: data.data.taskId, time: currentTime }]); 
            setFormData({ ...formData, [e.target.name]: e.target.value })
            setFormData({ title: "", categoryId: formData.categoryId, isCompleted: false, assignToId: [] });
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        };
    }

    const handleInputChange = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            title: inputRef.current?.value,
            assignToId
        } as any));
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            // Xóa task từ danh sách tasks
            console.log(taskId)
            await TASK_API.apiDeleteTaskUser(taskId);
            setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
        } catch (error) {
            console.error("Error creating task:", error);
            alert("delete task failure.");
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "100%",
                    backgroundColor: "#f9f9f9",
                    padding: 2,
                    borderRadius: "20px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    color: "var(--primary-color)",
                    background: "var(--third-deep-bgColor)"
                }}

                component={"form"} onSubmit={handleSubmitTask}
            >
                {/* Task Input Field */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="title"
                        placeholder="Add task for today"
                        onChange={handleInputChange}
                        value={formData.title}
                        inputRef={inputRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Add />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            background: "var(--primary-light-bgColor)",
                            // color: "var(--primary-color)",
                            borderRadius: "25px",
                            "& fieldset": { border: "none" },
                        }}
                    />
                    <IconButton color="primary" type="submit">
                        <Send />
                    </IconButton>
                </Box>

                {/* Quick Action Buttons */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Autocomplete
                        sx={{ flex: 1 }}
                        id="free-solo-demo"
                        freeSolo
                        options={data}
                        getOptionLabel={(option: any) => option.name?.toString() || ""}
                        onChange={(event, value) => {
                            if (value && !assignToId.includes(value.userId)) {
                                setAssignToId([...assignToId, value.userId]); // Chỉ thêm nếu chưa tồn tại
                            }
                        }}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Assigment task to users"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key == "Enter") {
                                        e.preventDefault();
                                        return;
                                    }
                                }}
                            />}
                    />
                    <FormControl sx={{ flex: 1 }}>
                        <InputLabel shrink>Category</InputLabel> {/* Shrink label to prevent overlap */}
                        <Select
                            labelId="category-label"
                            id="categoryId"
                            value={formData.categoryId || ""}
                            label="categoryId"
                            name="categoryId"
                            onChange={handleInputChange}
                            sx={chipStyle}
                            defaultValue={formData.categoryId}
                        >
                            {category.map((item, index) => <MenuItem key={index} value={item.categoryId ?? ''}>
                                {item.name}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" startIcon={<AccessTime />} sx={chipStyle}>Now</Button>
                    <Button variant="outlined" startIcon={<AccessTime />} sx={chipStyle}>Tomorrow</Button>
                    <Button variant="outlined" startIcon={<AccessTime />} sx={chipStyle}>Next week</Button>
                    <Button variant="outlined" startIcon={<Event />} sx={chipStyle}>Custom</Button>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                }}
            >
                {tasks?.length ? <List sx={{ minHeight: "70px" }}>
                    {tasks?.map((task, index) => (
                        <TaskMenuDropdown
                            task={task}
                            index={index}
                            handleDeleteTask={handleDeleteTask}
                            setTasks={setTasks}
                        />
                    ))}
                </List> : <></>
                }
            </Box>
        </>
    );
};


const chipStyle = {
    borderRadius: "25px",
    textTransform: "none",
    // borderColor: "#ccc",
    border: "none",
    color: "var(--primary-color)",
    backgroundColor: "var(--third-light-bgColor)",
    // "&:hover": { borderColor: "#888" },
};