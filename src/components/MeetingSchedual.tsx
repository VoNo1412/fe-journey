import { Card, CardContent, Typography, List, ListItem, Box } from "@mui/material";
import useAuth from "../hooks/useAuth";

const meetings = [
  {
    id: 1,
    title: "Design Team Meeting",
    description: "Discuss new project wireframes",
    time: "11:30 AM - 01:00 PM",
    color: "#4CAF50", // Green
  },
  {
    id: 2,
    title: "Client Meeting",
    description: "Review project updates and seek approval",
    time: "03:00 PM - 05:00 PM",
    color: "#3F51B5", // Blue
  },
];

const MeetingSchedule = () => {
  const { auth } = useAuth();
  // const {}
  

  return (
    <Card sx={{ maxWidth: 350, borderRadius: 4, boxShadow: 3, alignSelf: "flex-end", bgcolor: "var(--primary-deep-bgColor)", WebkitBoxShadow: "0 10px 10px powderblue", color: "var(--primary-color)" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Up next
        </Typography>
        <List sx={{ padding: 0 }}>
          {meetings.map((meeting) => (
            <ListItem key={meeting.id} sx={{ display: "flex", alignItems: "center", padding: "10px 0" }}>
              <Box
                sx={{
                  width: 4,
                  height: 40,
                  backgroundColor: meeting.color,
                  borderRadius: 2,
                  marginRight: 1.5,
                }}
              />
              <Box>
                <Typography fontWeight="bold">{meeting.title}</Typography>
                <Typography variant="body2" color="var(--primary-color)">
                  {meeting.description}
                </Typography>
                <Typography variant="body2" fontWeight="bold" color="gray">
                  {meeting.time}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default MeetingSchedule;
