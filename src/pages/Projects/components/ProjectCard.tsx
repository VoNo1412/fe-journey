import {
    Box,
    Card,
    Typography,
    LinearProgress,
    Avatar,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ project }: any) => {
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