import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const StatCard = ({ title, value, change, color }: any) => {
  const data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [10, 15, 5, 17, 8], // Sample data
        borderColor: color,
        fill: false,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <Card className="stat-card">
      <CardContent>
        <Box className="title-container">
          <Typography variant="body1" className="title-text">
            {title}
          </Typography>
          {title === 'Task Completed' && <span className="icon">⭐</span>}
          {title === 'New Tasks' && <span className="icon">📋</span>}
          {title === 'Project Done' && <span className="icon">📊</span>}
        </Box>
        <Typography variant="h4" className="value-text">
          {value}
        </Typography>
        <Box className="chart-container">
          <Line data={data} options={options} />
        </Box>
        <Typography
          variant="body2"
          className={change.includes('+') ? 'change-text positive' : 'change-text negative'}
        >
          {change}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;