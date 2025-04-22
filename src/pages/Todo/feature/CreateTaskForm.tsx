import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchTasks } from "../../../store/taskSlice";
import { SUB_TASK_API, UPLOAD_API } from "../../../api/api";
import { FileUpload } from "@mui/icons-material";


const TaskPopupForm = ({ open, handleClose, taskId }: any) => {
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const descRef = React.useRef<HTMLInputElement | null>(null);
  const { auth } = useAuth(); // Assuming you have a useAuth hook to get the auth context
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "Pending",
    isCompleted: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const [files, setFiles] = React.useState<File[]>([]);


  const statuses = ["Pending", "In Progress", "Completed"];
  const handleChange = (e: any) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {

      const response = await SUB_TASK_API.apiPostSubTask({
        ...formData,
        taskId,
        userId: auth.user.id,
        title: titleRef?.current?.value || "",
        description: descRef.current?.value || ""
      });

      if (files.length) {
        await UPLOAD_API.apiUploadFilesR2(files, response.data.id);
      }
      if (response?.statusCode !== 200) return;
      dispatch(fetchTasks(auth.user.id));
      setFormData({ title: "", description: "", status: "Pending", isCompleted: false });
      setFiles([]);
      handleClose(!open); // Close the popup
    } catch (error: any) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box
        component="form"
        onSubmit={handleSubmit} // Gắn onSubmit vào form
        sx={{ background: 'var(--third-light-bgColor)', color: 'white' }}
      >
        <DialogTitle sx={{ color: 'var(--primary-color)' }}>Create SubTask</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            inputRef={titleRef}
            required
            fullWidth
            margin="dense"
            inputProps={{ required: true }} // Đảm bảo trình duyệt nhận required
          />
          <TextField
            label="Description"
            required
            sx={{ whiteSpace: 'pre-wrap' }}
            name="description"
            inputRef={descRef}
            fullWidth
            multiline
            rows={3}
            margin="dense"
            inputProps={{ required: true }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button
            sx={{ marginTop: 3 }}
            variant="outlined"
            component="label"
            startIcon={<FileUpload />}
          >
            Upload File
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }}
            />
          </Button>
          {files.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <strong>Selected Files:</strong>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(!open)} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Create Subtask
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskPopupForm;
