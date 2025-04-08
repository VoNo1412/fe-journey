import { TextField, IconButton, Button, Box, InputAdornment, InputLabel, Autocomplete, CircularProgress } from "@mui/material";
import { Send, Add, AccessTime, Event } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { List } from "@mui/material";
import { Category } from "../../common/interface";
import React, { useState } from "react";
import { CATEGORY_API, endpoint } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import TaskMenuDropdown from "./components/TaskMenuDropdown";
import useFetchQuery from "../../hooks/useFetchSearch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createTask, deleteTask, fetchTasks, removeTaskOptimistic } from "../../store/taskSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showNotification } from "../../store/notificationSlice";
import useSocket from "../../hooks/useSocket";


export const Tasks = () => {
    const [category, setCategory] = React.useState<Category[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null); // Define the
    const { auth } = useAuth();
    const [query, setQuery] = useState("");
    const { data } = useFetchQuery(`/${endpoint.user}/by_name`, `username=${query}`);
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading } = useSelector((state: RootState) => state.tasks);
    const { message, type } = useSelector((state: RootState) => state.notification);
    const notificationData  = useSocket(auth?.user.id, 'notification'); // Replace with your socket URL

    React.useEffect(() => {
        if (message) {
            toast[type as "success" | "error" | "info" | "warning"](message);
        }
    }, [message, type]);

    const [formData, setFormData] = React.useState({
        title: "",
        categoryId: null as null | number,
        isCompleted: false,
        assignUserId: null,
        userId: auth?.user.id
    });

    console.log(notificationData, "this one")

    React.useEffect(() => {
        const fetchGetCategories = async () => await CATEGORY_API.apiGetCategories();
        fetchGetCategories()
            .then((res) => {
                setCategory(res);
                setFormData(prev => ({ ...prev, categoryId: res[0].id }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    React.useEffect(() => {
        if (!auth?.user?.id) return;
        dispatch(fetchTasks(auth.user.id));
    }, []);

    const handleSubmitTask = async (e: any) => {
        e.preventDefault();
        try {
            const title = inputRef.current?.value?.trim();
            if (!title) return;
            dispatch(createTask({ ...formData, title })).unwrap().then(() => dispatch(fetchTasks(auth.user.id)))
            if (inputRef.current) { inputRef.current.value = ""}
            dispatch(showNotification({ message: "Create task successfully!", type: "success" }));
            setFormData({ ...formData, title: "", categoryId: formData.categoryId, isCompleted: false } as any);
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task." + error);
        };
    }

    const handleInputChange = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            dispatch(removeTaskOptimistic(taskId)); // Remove from UI immediately
            dispatch(showNotification({ message: "Delete task successfully!", type: "success" }));
            await dispatch(deleteTask(taskId)).unwrap(); // Ensure task is deleted before fetching    
        } catch (error) {
            dispatch(showNotification({ message: "Failed to delete task.", type: "error" }));
        }
    };


    return (
        <>
            <ToastContainer position="top-right" autoClose={1000} />

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
                        inputRef={inputRef}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmitTask(e); // gọi hàm tạo task
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Add sx={{ fill: "var(--primary-color)" }} />
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
                        // sx={{ flex: 1 }}
                        sx={{
                            flex: 1,
                            background: "var(--third-light-bgColor)",
                            // color: "var(--primary-color)",
                            borderRadius: "25px",
                            "& fieldset": { border: "none" },
                        }}
                        id="free-solo-demo"
                        freeSolo
                        options={data.filter((x: any) => x.id !== auth.user.id)}
                        getOptionLabel={(option: any) => option?.username || ""}
                        onChange={(_: any, value) =>
                            setFormData(prev => {
                                console.log(' run inside here', value?.id)
                                const isAssigning = Boolean(value?.id);
                                return {
                                    ...prev,
                                    userId: isAssigning ? value.id : auth?.user.id,
                                    assignUserId: isAssigning ? auth?.user.id : null,
                                };
                            })
                        }
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Assign the task to users"
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
                            {category.map((item: any, index) => <MenuItem key={index} value={item?.id ?? ''}>
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
                {(loading && (!tasks || tasks.length === 0)) ? (
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    tasks && tasks.length > 0 && (
                        <List sx={{ minHeight: "70px" }}>
                            {tasks.map((task: any, index) => (
                                <TaskMenuDropdown
                                    key={index}
                                    task={task}
                                    index={index}
                                    handleDeleteTask={handleDeleteTask}
                                />
                            ))}
                        </List>
                    )
                )}

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