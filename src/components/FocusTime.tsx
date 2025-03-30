import { useState } from "react";
import { Box, Typography, Select, MenuItem, IconButton, Button } from "@mui/material";
import { Add, Remove, PlayArrow } from "@mui/icons-material";

const FocusTimer = () => {
    const [time, setTime] = useState(30);
    const [task, setTask] = useState("Cleaning up desk");

    const handleIncrease = () => setTime((prev) => prev + 5);
    const handleDecrease = () => setTime((prev) => (prev > 5 ? prev - 5 : prev));
    
    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-light-bgColor)",
                borderRadius: 4,
                boxShadow: 3,
                padding: 2,
                textAlign: "center",
            }}
        >
            {/* Forest Background */}
            <Box
                sx={{
                    backgroundImage: "url('https://source.unsplash.com/400x300/?forest')",
                    backgroundSize: "cover",
                    borderRadius: 3,
                    padding: 3,
                }}
            >
                {/* Title */}
                <Typography variant="h6" fontWeight="bold">
                    Focus Timer
                </Typography>

                {/* Task Selection */}
                <Select
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    size="small"
                    sx={{ mt: 1, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 1 }}
                >
                    <MenuItem value="Cleaning up desk">Cleaning up desk</MenuItem>
                    <MenuItem value="Reading a book">Reading a book</MenuItem>
                    <MenuItem value="Meditation">Meditation</MenuItem>
                </Select>

                {/* Timer Controls */}
                <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                    <IconButton onClick={handleDecrease} color="primary">
                        <Remove />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold">
                        {time} mins
                    </Typography>
                    <IconButton onClick={handleIncrease} color="primary">
                        <Add />
                    </IconButton>
                </Box>

                {/* Start Button */}
                <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    sx={{ mt: 3, backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
                >
                    Start
                </Button>
            </Box>
        </Box>
    );
};

export default FocusTimer;
