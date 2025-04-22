import { Box, Typography, Grid } from '@mui/material';
import StatCard from './components/StatCard';
import TeamMembers from './components/TeamMember';
import StatsChart from './components/StatsChart';
import "./css/dashboard.css";
import useAuth from '../../hooks/useAuth';
import getVietnamTimePeriod from '../../utils/timeUtils';
import mockData from '../../mock/stat.mock';
import React from 'react';
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});




const Dashboard = () => {
  const { auth } = useAuth();

  return <>
    <Box className="dashboard-section">
      {/* Greeting and Date */}
      <Box className="greeting-container">
        <Box>
          <Typography variant="body2" className="date-text">
            {formattedDate}
          </Typography>
          <Typography variant="h5" className="greeting-text">
            Good {getVietnamTimePeriod()}, {auth.user.username}
          </Typography>
        </Box>
      </Box>

      {/* Main Layout */}
      <Box className="main-layout">
        {/* Left Column: Stat Cards and Team Members */}
        <Box className="left-column">
          <Grid container spacing={3}>
            {mockData.map((x, index)=> <Grid item xs={12} md={3} key={index}
              sx={{
                position: 'relative', // Required for absolute positioning of :after
                '&:after': {
                  content: '""', // This will display the number "1"
                  position: 'absolute',
                  width: '65px',
                  height: '44px',
                  background: 'var(--primary-folder-bgColor)',
                  borderRadius: '36%', // Optional: makes it a circle
                  display: 'flex',
                  color: 'white',
                  fontWeight: 'bold',
                  top: '10px', // Adjust position as needed
                  left: "24px"
                },
              }}
            >
              <StatCard
                title={x.title}
                value={x.value}
                change={x.change}
                color={x.color}
                index={index}
              />
            </Grid>)}

          </Grid>
          <TeamMembers />
          <StatsChart />
        </Box>
      </Box>
    </Box>
  </>
}

export default React.memo(Dashboard);