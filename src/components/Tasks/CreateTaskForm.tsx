import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";
import { SUB_TASK_API } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchTasks } from "../../store/taskSlice";


const TaskPopupForm = ({ open, handleClose, taskId }: any) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { auth } = useAuth(); // Assuming you have a useAuth hook to get the auth context
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "Pending",
    isCompleted: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  const statuses = ["Pending", "In Progress", "Completed"];
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await SUB_TASK_API.apiPostSubTask({ ...formData, taskId, userId: auth.user.id });
      if (response?.statusCode !== 200) return;
      dispatch(fetchTasks(auth.user.id));
      setFormData({ title: "", description: "", status: "Pending", isCompleted: false });
      handleClose(!open); // Close the popup
    } catch (error: any) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ background: "var(--third-light-bgColor)" }}>
        <DialogTitle sx={{ color: "var(--primary-color)" }}>Create SubTask</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" inputRef={inputRef} onChange={handleChange} required fullWidth margin="dense" />
          <TextField label="Description" sx={{whiteSpace: 'pre-wrap'}} name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} margin="dense" />
          <TextField select label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth margin="dense">
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(!open)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Create Subtask</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskPopupForm;
