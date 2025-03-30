import { ListItem, ListItemButton, Checkbox, Box, Typography, styled, TextareaAutosize } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { ISubTask, Task } from "../../../common/interface";
import React, { useEffect } from "react";
import TaskPopupForm from "../CreateTaskForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SUB_TASK_API, TASK_API } from "../../../api/api";
import useAuth from "../../../hooks/useAuth";

interface TaskMenuDropdownProps {
    task: Task;
    index: number;
    handleDeleteTask: (taskId: number) => void;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SubTasks = styled('div')({
    background: "var(--third-light-bgColor)",
    width: "90%",
    color: "var(--primary-color)",
    padding: "20px",
    margin: "0 60px",
    borderRadius: "24px"
});

const TaskMenuDropdown: React.FC<TaskMenuDropdownProps> = ({ task, index, handleDeleteTask, setTasks }) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState<boolean>(false);
    const { auth } = useAuth();

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
                const fetchGetTasks = async () => await TASK_API.apiGetTasks(auth?.user?.id);
                fetchGetTasks()
                    .then((res) => {
                        setTasks(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch(err => console.error(err));
    }

    const enterSummarize = async (id: number | undefined, summarize: string) => {
        if(!id) return;
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
                        style={{
                            width: "100%",
                            margin: "10px 0",
                            borderRadius: "15px",
                            padding: "10px",
                            background: "var(--primary-light-bgColor)",
                            height: "130px"
                        }}
                        defaultValue={sub.summarize}
                        onKeyDown={(e: any) => {
                            if (e.key == "Enter") {
                                enterSummarize(sub.id, e.target.value);
                            }
                        }}
                    />


                </SubTasks>
            ))
            }
        </>
    );
};

export default TaskMenuDropdown;
