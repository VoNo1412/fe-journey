import { Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const StatCard = ({ title, value, change, color, index }: any) => {
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
          <Typography variant="body1" className="title-text" sx={{ paddingTop: "10px", fontSize: "14px", color: "#998b8b" }}>
            {index == 0 && <span className="icon">⭐</span>}
            {index == 1 && <span className="icon">📋</span>}
            {index == 2 && <span className="icon">📊</span>}
            {title}
          </Typography>
          <Typography variant="h6" className="value-text" color='#998b8b' paddingTop={"10px"}>
            {value}
          </Typography>
        </Box>
        <hr style={{ border: "1px solid #998b8b" }} />
        <Box className="chart-container-folder">
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