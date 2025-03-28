import { ListItem, ListItemButton, Checkbox, Box, Typography, styled, TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { ISubTask, Task } from "../../../common/interface";
import React from "react";
import TaskPopupForm from "../CreateTaskForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface TaskMenuDropdownProps {
    task: Task;
    index: number;
    handleDeleteTask: (taskId: number) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SubTasks = styled('div')({
    background: "white",
    width: "90%",
    height: "200px",
    color: "black",
    padding: "10px",
    margin: "0 60px",
    borderRadius: "24px"
});

const TaskMenuDropdown: React.FC<TaskMenuDropdownProps> = ({ task, index, handleDeleteTask, setTasks }) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = (e: Event | React.SyntheticEvent) => {
        if (buttonRef?.current?.contains(e.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    }
    return (
        <>
            <ListItem disablePadding key={index}>
                <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox sx={{ marginRight: 1 }} checked={task.isCompleted} />
                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                            <Typography variant="body1">{task.title} - {task.time}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        backgroundColor: task?.color
                                    }}
                                />
                                <Typography variant="body2" color="gray">
                                    {task?.nameCategory}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: "0 10px", alignItems: "center" }}>
                            <AddCircleOutlineIcon
                                sx={{ fontSize: "var(--seccond-size-icons)", color: "var(--primary-color)" }}
                                type="button"
                                onClick={() => setOpen(prev => !prev)}
                            />
                            <DeleteIcon
                                sx={{ fontSize: "var(--seccond-size-icons)", color: "var(--primary-color)" }}
                                type="button"
                                onClick={() => handleDeleteTask(task.taskId)}
                            />
                            <ArrowForwardIos
                                sx={{ fontSize: "var(--seccond-size-icons)", color: "#aaa" }}
                                type="button"
                            />
                        </Box>
                    </Box>
                </ListItemButton>

                <TaskPopupForm open={open} handleClose={handleClose} taskId={task.taskId} setTasks={setTasks} />
            </ListItem>
            {task?.subTasks?.length > 0 && task?.subTasks?.map((sub: ISubTask, index: number) => (
                <SubTasks key={index}>
                    <Typography variant="h5">Title: {sub.title} </Typography>
                    <Typography variant="inherit">Description: {sub.description}</Typography>
                    <TextareaAutosize
                        placeholder="summarize"
                        // height={100}
                        style={{ width: "100%", background: "lightgrey", height: "120px" }}
                    />
                </SubTasks>
            ))
            }
        </>
    );
};

export default TaskMenuDropdown;
