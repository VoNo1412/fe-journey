import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography } from "@mui/material";
import axios from "axios";

const TaskPopupForm = ({ open, handleClose }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Pending",
  });

  const statuses = ["Pending", "In Progress", "Completed"];

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/task", formData);
      console.log("Task Created:", response.data);
      alert("Task Created Successfully!");
      setFormData({ title: "", description: "", category: "", status: "Pending" });
      handleClose(); // Close the popup
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth margin="dense" />
        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} margin="dense" />
        <TextField label="Category" name="category" value={formData.category} onChange={handleChange} fullWidth margin="dense" />
        <TextField select label="Status" name="status" value={formData.status} onChange={handleChange} fullWidth margin="dense">
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Create Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopupForm;
