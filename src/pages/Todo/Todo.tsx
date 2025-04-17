import React from "react";
import { Box, Typography } from "@mui/material";
import { Tasks } from "./components/Tasks";
import getVietnamTimePeriod from "../../utils/timeUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Header from "../../components/Header/Header";
import ComingUpTask from "./components/ComingUpTask";
import SocialUser from "./components/ActivityPanel";

export const TodoList: React.FC = () => {
  const { total } = useSelector((state: RootState) => state.tasks);

  return (
    <>
      <Header />
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box sx={{ flex: 8, display: "flex", flexDirection: "column", gap: "10px 0" }}>
          <Box sx={{ background: "var(--second-deep-bgColor)", borderRadius: "24px", height: "36%" }}>
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
                flexDirection: "column",
                minHeight: "360px"
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Good {getVietnamTimePeriod()}
              </Typography>
              <Typography variant="h6">You have {total || 0} tasks today</Typography>
              <ComingUpTask />
            </Box>
          </Box>
          <Tasks />
        </Box>
        <SocialUser />
      </Box>
    </>
  );
};

