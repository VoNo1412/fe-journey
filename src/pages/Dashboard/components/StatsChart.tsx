import React from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const StatsChart = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = {
    labels: ['07PM', '08PM', '09PM', '10PM', '11PM'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [10, 15, 5, 17, 8],
        borderColor: '#00bcd4',
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true, ticks: { color: 'white' } },
      x: { ticks: { color: 'white' } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: (context: any) => {
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) return;

          const dataIndex = tooltipModel.dataPoints[0].dataIndex;
          if (dataIndex === 3) { // Show tooltip at "10PM"
            const element = document.createElement('div');
            element.innerHTML = `<div class="custom-tooltip">17 Task Completed</div>`;
            document.body.appendChild(element);
            setTimeout(() => element.remove(), 2000);
          }
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box className="stats-chart-container">
      <Box className="stats-header">
        <Typography variant="h6" className="stats-title">
          Statistics
        </Typography>
        <Box>
          <Button
            className="dropdown-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Monthly
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Daily</MenuItem>
            <MenuItem onClick={handleClose}>Weekly</MenuItem>
            <MenuItem onClick={handleClose}>Monthly</MenuItem>
          </Menu>
          <Typography variant="body2" component="span" className="date-text">
            March 02, 2022
          </Typography>
        </Box>
      </Box>
      <Box className="chart-container">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default StatsChart;