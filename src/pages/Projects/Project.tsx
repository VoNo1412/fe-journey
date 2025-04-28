import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Drawer,
  IconButton,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import projectMock from "../../mock/project.mock";
import ProjectTabs from "./components/Tab";
import useFetchQuery from "../../hooks/useFetchSearch";
import { endpoint } from "../../api/api";
import useAuth from "../../hooks/useAuth";

const ProjectsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [projects, setProjects] = useState(projectMock); // Sử dụng mock data
  const [newProject, setNewProject] = useState({
    name: "",
    idea: "",
    tagsUser: []
  });
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState("");
  const { data } = useFetchQuery(`/${endpoint.user}/by_name`, query);
  const location = useLocation();
  // const navigate = useNavigate();
  const { auth } = useAuth()

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
      tab: tab,
    };
    setProjects((prev: any) => [...prev, newProjectData]);
    setNewProject({ name: "", idea: "", tagsUser: [] });
    setOpenDrawer(false);
    // navigate(`/project/${newId}`, { state: { projectName: newProjectData.name } });
  };

  useEffect(() => {
    if (openDrawer) {
      setNewProject({ name: "", idea: "", tagsUser: [] });
    }

    if (tab) {
      setNewProject((prev) => ({ ...prev, tab }));
    }
  }, [openDrawer, tab]);


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

          <Box >
            {projects.length === 0 ? (
              <Typography color="white">No projects yet. Create one to get started!</Typography>
            ) : (
              <ProjectTabs projects={projects} setTab={setTab} />
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
        <Box p={3} position="relative" height="100%" gap={2} display="flex" flexDirection="column">
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

          {tab == 0 &&
            <Autocomplete
              sx={{
                borderRadius: "25px",
                "& fieldset": { border: "none" },
              }}
              id="free-solo-demo"
              freeSolo
              options={data.filter((x: any) => x.id !== auth.user.id)}
              getOptionLabel={(option: any) => option?.username || ""}
              onChange={(_: any, value) => {
                if (value && !newProject.tagsUser.some((x: any) => x.id == value.id)) {
                  setNewProject((prev) => ({ ...prev, tagsUser: [...prev.tagsUser, { id: value.id, username: value?.username }] } as any));
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ color: "white", backgroundColor: "#1e1e1e" }}
                  label="Target user"
                  placeholder="Search user"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            />

          }

          {tab == 0 && newProject.tagsUser.length > 0 && <Box mb={1}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Tags user
            </Typography>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 1
            }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {newProject.tagsUser.map((tag: any, index) => <Box key={index}
                  sx={{ backgroundColor: "#1e1e1e", display: "flex", padding: 1, borderRadius: 1 }}>
                  {tag.username}
                  <Box sx={{ ml: 1 }}>X</Box>
                </Box>)}
              </Box>
              <Box>X</Box>
            </Box>
          </Box>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, borderRadius: 3, textTransform: "none", fontWeight: "bold" }}
            onClick={handleCreateProject}
            disabled={!newProject.name || !newProject.idea}
          >
            Create
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProjectsPage;