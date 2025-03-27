import { ListItem, ListItemButton, Checkbox, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Task } from "../../../common/interface";
import React from "react";
import TaskPopupForm from "../CreateTaskForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


interface TaskMenuDropdownProps {
    task: Task;
    index: number;
    handleDeleteTask: (taskUserId: number) => void;
}

const TaskMenuDropdown: React.FC<TaskMenuDropdownProps> = ({ task, index, handleDeleteTask }) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = (e: Event | React.SyntheticEvent) => {
        console.log( buttonRef?.current?.contains(e.target as HTMLElement))
        // if (buttonRef?.current?.contains(e.target as HTMLElement)) {
        //     console.log('run inside heer ')
        //     return;
        // }
        console.log("run inside x2 after if")
        setOpen(false);
    }
    const handleToggle = () => {
        setOpen(prev => !prev);
    }

    return (
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
                    <Box sx={{display: "flex", gap: "0 10px", alignItems: "center"}}>
                        <button ref={buttonRef} type="button" onClick={handleToggle} style={{ background: "none", border: "none", padding: 0 }}>
                            <AddCircleOutlineIcon sx={{ fontSize: "var(--seccond-size-icons)", color: "var(--primary-color)" }}/>
                        </button>
                        <DeleteIcon sx={{ fontSize: "var(--seccond-size-icons)", color: "var(--primary-color)" }} type="button" onClick={() => handleDeleteTask(task.taskUserId)} />
                        <ArrowForwardIos sx={{ fontSize: "var(--seccond-size-icons)",  color: "#aaa"}} />
                    </Box>
                </Box>
            </ListItemButton>

            <TaskPopupForm open={open} handleClose={handleClose} />

            {/* ✅ Render Subtasks if Available */}
            {/* {task?.subtasks && task?.subtasks.length > 0 && (
                <Box sx={{ paddingLeft: 4 }}>
                    {task?.subtasks.map((subtask, subIndex) => (
                        <TaskMenuDropdown key={subIndex} task={subtask} index={subIndex} handleDeleteTask={handleDeleteTask} />
                    ))}
                </Box>
            )} */}
        </ListItem>
    );
};

export default TaskMenuDropdown;
