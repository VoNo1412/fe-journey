import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  LinearProgress,
  TextField,
  Avatar,
  Chip,
  Drawer,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import projectMock from "../../mock/project.mock";

const ProjectCard = ({ project }: any) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ backgroundColor: "#121212", color: "#fff", p: 2, borderRadius: 3, flex: 3 }}
      onClick={() => {
        navigate(`/project/${project.id}`, { state: { projectName: project.name } });
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src="/path/to/your/image.png"
          variant="rounded"
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">{project.name}</Typography>
          <Chip label="Building" color="primary" size="small" sx={{ mt: 0.5 }} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body2">0% Completed</Typography>
        <Typography variant="body2">0/0 tasks</Typography>
      </Box>

      <LinearProgress variant="determinate" value={0} sx={{ height: 8, borderRadius: 5 }} />

      <Typography variant="caption" color="grey.500" mt={2} display="block">
        Last updated Just now
      </Typography>
    </Card>
  );
};

const ProjectsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [projects, setProjects] = useState(projectMock); // Sử dụng mock data
  const [newProject, setNewProject] = useState({
    name: "",
    idea: "",
    targetUser: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra nếu route hiện tại là "/project"
  const isProjectsRoute = location.pathname === "/project";

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = () => {
    // Tạo ID mới bằng cách lấy ID lớn nhất hiện tại và tăng lên 1
    const newId = projects.length > 0
      ? String(Math.max(...projects.map(p => parseInt(p.id))) + 1)
      : "1";

    const newProjectData = {
      id: newId,
      name: newProject.name,
      idea: newProject.idea,
      targetUser: newProject.targetUser,
    };
    setProjects((prev) => [...prev, newProjectData]);
    setNewProject({ name: "", idea: "", targetUser: "" });
    setOpenDrawer(false);
    // Điều hướng đến roadmap của project vừa tạo
    navigate(`/project/${newId}`, { state: { projectName: newProjectData.name } });
  };

  return (
    <Box minHeight="100vh" bgcolor="#000" p={4}>
      {isProjectsRoute && (
        <>
          <Typography variant="h4" fontWeight="bold" color="white" mb={4}>
            Projects
          </Typography>

          <Box display="flex" justifyContent="space-between" mb={4}>
            <TextField
              placeholder="Search projects"
              variant="outlined"
              size="small"
              InputProps={{
                sx: { borderRadius: 3, backgroundColor: "#1e1e1e", color: "white" },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDrawer(true)}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: "bold" }}
            >
              New project
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {projects.length === 0 ? (
              <Typography color="white">No projects yet. Create one to get started!</Typography>
            ) : (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </Box>
        </>
      )}

      <Outlet />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 }, backgroundColor: "#121212", color: "white" },
        }}
      >
        <Box p={3} position="relative" height="100%">
          <IconButton
            onClick={() => setOpenDrawer(false)}
            sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" fontWeight="bold" mb={3}>
            Add new project
          </Typography>

          <TextField
            label="Project name"
            name="name"
            value={newProject.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white", backgroundColor: "#1e1e1e" } }}
          />

          <TextField
            label="Your idea"
            name="idea"
            value={newProject.idea}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white", backgroundColor: "#1e1e1e" } }}
          />

          <TextField
            label="Target user"
            name="targetUser"
            value={newProject.targetUser}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white", backgroundColor: "#1e1e1e" } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, borderRadius: 3, textTransform: "none", fontWeight: "bold" }}
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.idea || !newProject.targetUser}
          >
            Create
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProjectsPage;