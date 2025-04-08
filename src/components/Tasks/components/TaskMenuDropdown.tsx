import { ListItem, ListItemButton, Checkbox, Box, Typography, TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { ISubTask, Task } from "../../../common/interface";
import React from "react";
import TaskPopupForm from "../CreateTaskForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SUB_TASK_API } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/taskSlice";

interface TaskMenuDropdownProps {
    task: Task;
    index: number;
    handleDeleteTask: (taskId: number) => void;
}

const TaskMenuDropdown: React.FC<TaskMenuDropdownProps> = ({ task, index, handleDeleteTask }) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);
    const { auth } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const [showSubTasks, setShowSubTasks] = React.useState<boolean>(false);
    const subTaskRef = React.useRef<HTMLDivElement>(null);

    const handleClose = (e: Event | React.SyntheticEvent) => {
        if (buttonRef?.current?.contains(e.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    }

    const handleDelSubTask = async (subTaskId: number | any) => {
        await SUB_TASK_API.apiDeleteSubTask(subTaskId)
            .then(res => {
                if (res.statusCode != 200) return;
                dispatch(fetchTasks(auth.user.id));
            })
            .catch(err => console.error(err));
    }

    const enterSummarize = async (id: number | undefined, summarize: string) => {
        if (!id) return;
        await SUB_TASK_API.apiUpdateSummarize(id, summarize)
            .then(res => {
                if (res.statusCode != 200) return;
                alert('success');
            })
            .catch(err => console.error(err));
    }


    return (
        <>
            <ListItem disablePadding key={index}>
                <ListItemButton sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox sx={{ marginRight: 1 }} checked={task.isCompleted} />
                    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                            <Typography variant="body1">{task.title} - {task.time} + {task?.assigned?.username}</Typography>
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
                                sx={{
                                    fontSize: "var(--seccond-size-icons)", color: "#aaa", cursor: "pointer",
                                    transition: "transform 0.3s ease",
                                    transform: showSubTasks ? "rotate(90deg)" : "rotate(0deg)",
                                }}
                                type="button"
                                onClick={() => setShowSubTasks(prev => !prev)}

                            />
                        </Box>
                    </Box>
                </ListItemButton>

                <TaskPopupForm open={open} handleClose={handleClose} taskId={task.taskId} />
            </ListItem>

            {task?.subTasks?.length > 0 && task?.subTasks?.map((sub: ISubTask, index: number) => (
                <Box key={index}
                    component={"div"}
                    ref={subTaskRef}
                    style={{
                        maxHeight: showSubTasks
                            ? `100%`
                            : "0px",
                        overflow: "hidden",
                        visibility: showSubTasks ? "visible" : "hidden",
                        opacity: showSubTasks ? 1 : 0,
                        transition: showSubTasks
                        ? "max-height 0.5s ease, opacity 0.5s ease"
                        : "opacity 0.6s ease 0.4s, max-height 10s ease", // 👈 delay opacity, kéo dài max-height
                        position: showSubTasks ? "relative" : "absolute",
                    }}
                    sx={{
                        background: "var(--third-light-bgColor)",
                        width: "90%",
                        color: "var(--primary-color)",
                        padding: "20px",
                        margin: "0 8%",
                        borderRadius: "24px"

                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5">Title: {sub.title} </Typography>
                        <DeleteIcon
                            sx={{ fontSize: "var(--seccond-size-icons)", color: "var(--primary-color)" }}
                            type="button"
                            onClick={() => handleDelSubTask(sub?.id)}
                        />
                    </Box>
                    <Typography variant="inherit">Description: {sub.description}</Typography>
                    <TextareaAutosize
                        placeholder="summarize"
                        className="textArea"
                        style={{
                            width: "100%",
                            margin: "10px 0",
                            borderRadius: "15px",
                            padding: "10px",
                            background: "var(--primary-light-bgColor)",
                            height: "130px",
                            color: "white"
                        }}
                        defaultValue={sub.summarize}
                        onKeyDown={(e: any) => {
                            if (e.key == "Enter") {
                                enterSummarize(sub.id, e.target.value);
                            }
                        }}
                    />


                </Box>
            ))}
        </>
    );
};

export default React.memo(TaskMenuDropdown);
