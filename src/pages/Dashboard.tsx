import React from "react";
import { Box, Typography } from "@mui/material";
import MeetingSchedule from "../components/MeetingSchedual";
import { Tasks } from "../components/Tasks/Tasks";
import useAuth from "../hooks/useAuth";
import getVietnamTimePeriod from "../common/time";
import Header from "../components/Header";
import SidebarRight from "../components/SidebarRight";

const Dashboard: React.FC = () => {
  const { auth } = useAuth();

  return (
    <>
      <Header />
      <Box sx={{display: "flex", gap: 3}}>
        <Box sx={{ flex: 8, display: "flex", flexDirection: "column", gap: "30px 0" }}>
          <Box sx={{ background: "var(--second-deep-bgColor)", padding: 2, borderRadius: "24px", height: "60%" }}>
            <Box
              sx={{
                backgroundImage: `url(https://images.unsplash.com/photo-1741807117240-0aee0cd41d25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                padding: 6,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Good {getVietnamTimePeriod()}
              </Typography>
              <Typography variant="h6">You have {auth?.totalTasks || 0} tasks today</Typography>
              <MeetingSchedule />
            </Box>
          </Box>
          <Tasks />
        </Box>
        <SidebarRight />
      </Box>
    </>
  );
};

export default Dashboard;
