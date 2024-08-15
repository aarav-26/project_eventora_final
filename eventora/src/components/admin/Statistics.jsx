import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register components needed for the chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Statistics = () => {
  // Static data for demonstration purposes
  const statistics = {
    totalEvents: 120,
    activeEvents: 40,
    upcomingEvents: 35,
    pastEvents: 45,
    monthlyEventTrends: [12, 15, 25, 20, 18, 30, 40, 35, 32, 28, 25, 22], // Sample data for each month
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Events Held',
        data: statistics.monthlyEventTrends,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="statistics-container">
      <h1 className="statistics-title">Admin Dashboard - Event Statistics</h1>
      <div className="statistics-cards">
        <div className="statistics-card">
          <h2>Total Events</h2>
          <p>{statistics.totalEvents}</p>
        </div>
        <div className="statistics-card">
          <h2>Active Events</h2>
          <p>{statistics.activeEvents}</p>
        </div>
        <div className="statistics-card">
          <h2>Upcoming Events</h2>
          <p>{statistics.upcomingEvents}</p>
        </div>
        <div className="statistics-card">
          <h2>Past Events</h2>
          <p>{statistics.pastEvents}</p>
        </div>
      </div>
      <div className="statistics-chart">
        <h2>Monthly Event Trends</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Statistics;
