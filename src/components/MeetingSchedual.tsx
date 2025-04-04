import { Card, CardContent, Typography, List, ListItem, Box } from "@mui/material";
import useAuth from "../hooks/useAuth";
import React, { useEffect } from "react";
import { SUB_TASK_API } from "../api/api";

const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

const getRandomGradient = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const directions = ['to left', 'to right', 'to top', 'to bottom', 'to top left', 'to top right', 'to bottom left', 'to bottom right'];
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];

  return `linear-gradient(${randomDirection}, ${color1}, ${color2})`;
};

// export default GradientComponent;
const MeetingSchedule = () => {
  const { auth } = useAuth();
  const [subTasks, setSubTask] = React.useState([]);

  useEffect(() => {
    if (!auth?.user?.id) return;
    const fetchSubTasks = async () => await SUB_TASK_API.getAllSubTasks(auth?.user.id);
    fetchSubTasks().then(res => setSubTask(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <>
      {subTasks?.length ?
        <Card sx={{ maxWidth: 350, borderRadius: 4, boxShadow: 3, alignSelf: "flex-end", bgcolor: "var(--primary-deep-bgColor)", WebkitBoxShadow: "0 10px 10px powderblue", color: "var(--primary-color)", minWidth: "300px", minHeight: "200px" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Up next
            </Typography>
            <List sx={{ padding: 0 }}>
              {subTasks.map((meeting: any) => (
                <ListItem key={meeting.id} sx={{ display: "flex", alignItems: "center", padding: "10px 0", }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 40,
                      background: getRandomGradient(),
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
       : <></>}
       
    </>
  );
};

export default React.memo(MeetingSchedule);
