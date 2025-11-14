import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { getTotalEmissions, getEmissionsByPeriod } from '../services/api';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [period, setPeriod] = useState('day');
  const [loading, setLoading] = useState(true);
  const [activityBreakdown, setActivityBreakdown] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, [period]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const totalResponse = await getTotalEmissions();
      setTotalEmissions(totalResponse.totalCo2e || 0);

      if (totalResponse.activities) {
        const breakdown = {
          commute: 0,
          food: 0,
          electricity: 0,
        };
        totalResponse.activities.forEach((activity) => {
          if (breakdown[activity.activityType] !== undefined) {
            breakdown[activity.activityType] += activity.co2e || 0;
          }
        });
        setActivityBreakdown(breakdown);
      }

      const periodResponse = await getEmissionsByPeriod({
        period,
        days: period === 'day' ? 7 : 30,
      });
      setDailyData(periodResponse.data || []);

      const weeklyResponse = await getEmissionsByPeriod({
        period: 'week',
        days: 30,
      });
      setWeeklyData(weeklyResponse.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const dailyChartData = {
    labels: dailyData.map((item) => {
      const date = new Date(item.date);
      return period === 'day'
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }),
    datasets: [
      {
        label: 'CO₂e Emissions (kg)',
        data: dailyData.map((item) => item.co2e.toFixed(2)),
        borderColor: 'rgb(76, 175, 80)',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const weeklyChartData = {
    labels: weeklyData.map((item) => {
      const date = new Date(item.date);
      return `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }),
    datasets: [
      {
        label: 'Weekly CO₂e Emissions (kg)',
        data: weeklyData.map((item) => item.co2e.toFixed(2)),
        backgroundColor: 'rgba(76, 175, 80, 0.7)',
        borderColor: 'rgb(76, 175, 80)',
        borderWidth: 2,
      },
    ],
  };

  const breakdownChartData = {
    labels: ['Commute', 'Food', 'Electricity'],
    datasets: [
      {
        data: [
          activityBreakdown.commute || 0,
          activityBreakdown.food || 0,
          activityBreakdown.electricity || 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: period === 'day' ? 'Daily Emissions (Last 7 Days)' : 'Weekly Emissions (Last 4 Weeks)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO₂e (kg)',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Carbon Footprint Dashboard</h2>
        <div className="period-selector">
          <button
            className={period === 'day' ? 'active' : ''}
            onClick={() => setPeriod('day')}
          >
            Daily
          </button>
          <button
            className={period === 'week' ? 'active' : ''}
            onClick={() => setPeriod('week')}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total CO₂e</h3>
          <p className="stat-value">{totalEmissions.toFixed(2)} kg</p>
          <p className="stat-label">All Time</p>
        </div>
        <div className="stat-card commute">
          <h3>Commute</h3>
          <p className="stat-value">{(activityBreakdown.commute || 0).toFixed(2)} kg</p>
        </div>
        <div className="stat-card food">
          <h3>Food</h3>
          <p className="stat-value">{(activityBreakdown.food || 0).toFixed(2)} kg</p>
        </div>
        <div className="stat-card electricity">
          <h3>Electricity</h3>
          <p className="stat-value">{(activityBreakdown.electricity || 0).toFixed(2)} kg</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <Line data={dailyChartData} options={chartOptions} />
        </div>
        <div className="chart-card">
          <Bar data={weeklyChartData} options={chartOptions} />
        </div>
        <div className="chart-card breakdown">
          <Doughnut
            data={breakdownChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Emissions by Activity Type',
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

