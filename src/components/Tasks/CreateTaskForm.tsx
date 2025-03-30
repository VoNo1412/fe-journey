import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";
import { SUB_TASK_API, TASK_API } from "../../api/api";
import useAuth from "../../hooks/useAuth";


const TaskPopupForm = ({ open, handleClose, taskId, setTasks }: any) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { auth } = useAuth(); // Assuming you have a useAuth hook to get the auth context
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "Pending",
    isCompleted: false,
  });

  const statuses = ["Pending", "In Progress", "Completed"];
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await SUB_TASK_API.apiPostSubTask({ ...formData, taskId, userId: auth.user.id });
      if (response?.statusCode !== 200) return;
      const data = await TASK_API.apiGetTasks(auth?.user.id); // Refresh the task list
      setTasks(data); // Update the task list in the parent component
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
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} margin="dense" />
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
