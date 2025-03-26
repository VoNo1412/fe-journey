import React, { useState } from "react";
import { Container, Card, CardContent, Typography, LinearProgress, Checkbox, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

const initialRoadmap = [
  { week: 1, title: "Học 50 từ vựng cơ bản", completed: true },
  { week: 2, title: "Luyện phát âm IPA", completed: false },
  { week: 3, title: "Nghe hiểu hội thoại đơn giản", completed: false },
];

const LearningRoadmap = () => {
  const [roadmap, setRoadmap] = useState(initialRoadmap);
  
  const handleComplete = (index: any) => {
    const updatedRoadmap = roadmap.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setRoadmap(updatedRoadmap);
  };

  const progress = (roadmap.filter(item => item.completed).length / roadmap.length) * 100;

  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📘 Lộ trình học của bạn
          </Typography>
          <LinearProgress variant="determinate" value={progress} style={{ marginBottom: 20 }} />
          <Typography variant="body1">Tiến độ: {Math.round(progress)}%</Typography>
          <List>
            {roadmap.map((item, index) => (
              <ListItem key={item.week} component="button" onClick={() => handleComplete(index)}>
                <ListItemIcon>
                  <Checkbox checked={item.completed} />
                </ListItemIcon>
                <ListItemText primary={`Tuần ${item.week}: ${item.title}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LearningRoadmap;