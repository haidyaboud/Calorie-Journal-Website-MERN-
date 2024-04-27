import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components used by Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CalorieChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/calorie/');
        setChartData({
          labels: response.data.map(item => item.description),
          datasets: [
            {
              label: "Cal",
              data: response.data.map(item => item.calories),
              backgroundColor: [
                "#f42f42",
                "#5ab950",
                "#fe812a"
              ],
            },
          ],
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <h4>Food</h4>
      <h5 style={{ fontSize: "20", textAlign: "center", marginBottom: "1em" }}>
        Calorie Intake per each Food
      </h5>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Calorie Per Food",
                fontSize: 20,
                color: "#212529",
              },
            },
            scales: {
              y: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CalorieChart;
