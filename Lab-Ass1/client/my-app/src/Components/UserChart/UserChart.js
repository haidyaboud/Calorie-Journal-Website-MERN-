import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components used by Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const UserChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/calorie/');
        setChartData({
          labels: response.data.map(item => item.username),
          datasets: [
            {
              label: "Calories",
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
      <h5 style={{ fontSize: "20", textAlign: "center", marginTop: "1em", marginBottom: "1em" }}>
        Calorie per user
      </h5>
      <Pie data={chartData} />
    </div>
  );
};

export default UserChart;
