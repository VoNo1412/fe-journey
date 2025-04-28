import { useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  Typography,
  IconButton,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { Add, Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import roadmapMock from "../../../mock/roadmap.mock";

// Hàm định dạng ngày thành dạng "MMM DD, YYYY"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // "Apr"
    day: "numeric", // "15"
    year: "numeric", // "2025"
  });
};

export default function RoadmapPage() {
  const [entries, setEntries] = useState(roadmapMock);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", description: "", comment: "", releaseDate: "" });
  const [editingEntry, setEditingEntry] = useState<any>(null); // State để lưu entry đang chỉnh sửa

  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  const projectName = location.state?.projectName || "Unnamed Project";
  const projectEntries = entries.filter((entry) => entry.projectId === projectId);

  const handleOpenDrawer = (entry: any) => {
    if (entry) {
      // Nếu đang chỉnh sửa, điền dữ liệu của entry vào form
      setEditingEntry(entry);
      setNewEntry({
        title: entry.title,
        description: entry.description,
        comment: entry.comment,
        releaseDate: entry.releaseDate,
      });
    } else {
      // Nếu thêm mới, reset form
      setEditingEntry(null);
      setNewEntry({ title: "", description: "", comment: "", releaseDate: "" });
    }
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingEntry(null);
    setNewEntry({ title: "", description: "", comment: "", releaseDate: "" });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEntry = () => {
    if (editingEntry) {
      // Nếu đang chỉnh sửa, cập nhật entry hiện có
      setEntries((prev) =>
        prev.map((entry: any) =>
          entry.id === editingEntry.id
            ? { ...entry, ...newEntry }
            : entry
        )
      );
    } else {
      // Nếu thêm mới, tạo entry mới
      const newEntryId = `${projectId}-${projectEntries.length + 1}`;
      const newEntryData = {
        projectId,
        id: newEntryId,
        title: newEntry.title,
        description: newEntry.description,
        comment: newEntry.comment,
        releaseDate: newEntry.releaseDate,
      };
      setEntries((prev: any) => [...prev, newEntryData]);
    }
    handleCloseDrawer();
  };

  const handleDeleteEntry = (entryId: any) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const handleGoBack = () => {
    navigate("/project");
  };

  return (
    <Box style={{ padding: 24 }} minHeight="100vh" bgcolor="#000" p={4}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleGoBack} sx={{ color: "white", mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Roadmap for {projectName}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDrawer(editingEntry)}>
          Add entry
        </Button>
      </Box>

      {/* Timeline Container */}
      <Box sx={{ display: "flex", position: "relative", marginTop: 3, padding: "0 100px", alignItems: "center", justifyContent: "center" }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: "absolute",
            left: "140px",
            top: 0,
            bottom: 0,
            width: "2px",
            backgroundColor: "#888",
            zIndex: 1,
          }}
        />

        {/* Entries with Timeline Dots */}
        <Stack spacing={4} sx={{ width: "100%" }}>
          {projectEntries.length === 0 ? (
            <Typography color="white">No roadmap entries yet. Add one to get started!</Typography>
          ) : (
            projectEntries.map((entry: any) => (
              <Box key={entry.id} sx={{ display: "flex", alignItems: "flex-start" }}>
                {/* Timeline Dot and Date */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "80px" }}>
                  <Typography variant="caption" sx={{ mb: 1, color: "white", position: "absolute", left: "40px" }}>
                    {formatDate(entry.releaseDate)}
                  </Typography>
                  <Box
                    sx={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#1976d2",
                      zIndex: 2,
                    }}
                  />
                </Box>

                {/* Card Content */}
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: "#121212",
                    color: "white",
                    marginLeft: 2,
                    width: "60%",
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Typography variant="h6">{entry.title}</Typography>
                      <Stack direction="row" spacing={1} marginTop={1}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDrawer(entry)}>
                          <Edit />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteEntry(entry.id)}>
                          <Delete />
                        </IconButton>
                      </Stack>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        textOverflow: "ellipsis",
                        maxWidth: "500px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.description}
                    </Typography>
                    <Typography variant="caption">comment: {entry.comment}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          )}
        </Stack>
      </Box >

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 700, padding: 3, bgcolor: "#000", color: "white", height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            {editingEntry ? "Edit Entry" : "Add Entry"}
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={newEntry.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 4 } }}
          />
          <TextField
            label="Description"
            name="description"
            value={newEntry.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3 * 3}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 4 } }}
          />
          <TextField
            label="comment"
            name="comment"
            value={newEntry.comment}
            onChange={handleChange}
            fullWidth
            margin="normal"
            placeholder="Enter your comment here..."
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 4 } }}
          />
          <TextField
            label="Release Date"
            name="releaseDate"
            value={newEntry.releaseDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{ style: { color: "white", backgroundColor: "#333", borderRadius: 4 } }}
          />
          <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleSaveEntry}>
            {editingEntry ? "Save Changes" : "Create"}
          </Button>
        </Box>
      </Drawer>
    </Box >
  );
}