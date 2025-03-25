import { TextField, IconButton, Button, Box, InputAdornment } from "@mui/material";
import { Send, Add, AccessTime, Event } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Checkbox, List, ListItem, ListItemButton } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { Category, Task } from "../../common/interface";
import React from "react";
import { CATEGORY_API, TASK_API } from "../../api/api";
import useAuth from "../../hooks/useAuth";


export const TaskInput = () => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [category, setCategory] = React.useState<Category[]>([]);
    const inputRef = React.useRef<HTMLInputElement | null>(null); // Define the
    const { auth } = useAuth();
    console.log('this is user: ', auth);
    const [formData, setFormData] = React.useState({
        title: "",
        categoryId: null as null | number,
        time: null,
        isCompleted: false,
    });

    async function getTasks() {
        const tasks = await TASK_API.apiGetTasks(auth.user.userId);
        setTasks(tasks);
    }

    React.useEffect(() => {
        getTasks();        
    }, []);

    React.useEffect(() => {
        async function getCategories() {
            const categories = await CATEGORY_API.apiGetCategories();
            setCategory(categories);
            setFormData({ ...formData, categoryId: categories[0].categoryId })
        }

        getCategories();
    }, []);

    const handleSubmitTask = async (e: any) => {
        e.preventDefault();
        try {
            await TASK_API.apiCreateTask({ ...formData, userId: auth.user.userId });
            setFormData({ ...formData, [e.target.name]: e.target.value })
            getTasks();  
            setFormData({ title: "", categoryId: formData.categoryId, time: null, isCompleted: false });
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        };
    }

    const handleInputChange = (e: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
            title: inputRef.current?.value
        } as any));
    };

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
                            backgroundColor: "white",
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
                    <FormControl sx={{ flex: 1 }}>
                        <InputLabel id="demo-simple-select-label">{category.find(x => x.categoryId == formData.categoryId)?.name}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.categoryId}
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
                {/* <TaskPopupForm open={1} handleClose={1}/> */}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                }}
            >
                <List>
                    {tasks?.map((task, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                                {/* Checkbox */}
                                <Checkbox sx={{ marginRight: 1 }} checked={task.isCompleted} />

                                {/* Task Details */}
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">{task.title}</Typography>

                                    {/* Category with Color Indicator */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                backgroundColor: task.color
                                            }}
                                        />
                                        <Typography variant="body2" color="gray">
                                            {task.nameCategory}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Time & Arrow Icon */}
                                <Typography variant="body2" sx={{ marginRight: 1 }}>
                                    {task.time?.getDate()}
                                </Typography>
                                <ArrowForwardIos sx={{ fontSize: 16, color: "#aaa" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
};


const chipStyle = {
    borderRadius: "25px",
    textTransform: "none",
    borderColor: "#ccc",
    color: "#555",
    backgroundColor: "white",
    "&:hover": { borderColor: "#888" },
};