import { Box, Typography, Grid } from '@mui/material';
import "./css/dashboard.css";
import StatCard from './components/StatCard';
import TeamMembers from './components/TeamMember';
import StatsChart from './components/StatsChart';

const Dashboard = () => (
  <Box className="dashboard-section">
    {/* Greeting and Date */}
    <Box className="greeting-container">
      <Box>
        <Typography variant="body2" className="date-text">
          Tuesday, March 1
        </Typography>
        <Typography variant="h5" className="greeting-text">
          Good Evening, Williamson
        </Typography>
      </Box>
    </Box>

    {/* Main Layout */}
    <Box className="main-layout">
      {/* Left Column: Stat Cards and Team Members */}
      <Box className="left-column">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Task Completed"
              value="08"
              change="+10% more from last week"
              color="#ff4081"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="New Tasks"
              value="07"
              change="+10% more from last week"
              color="#00bcd4"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Project Done"
              value="13"
              change="+8% more from last week"
              color="#ab47bc"
            />
          </Grid>
        </Grid>
        <TeamMembers />
        <StatsChart />
      </Box>     
    </Box>
  </Box>
);

export default Dashboard;