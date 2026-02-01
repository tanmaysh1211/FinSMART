import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {getDayWise} from "../../services/api";

const DailyExpenseChart = ({range}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getDayWise(range).then(res => {
      console.log("DAY WISE API:", res.data);

      if (!res.data || res.data.length === 0) {
        setChartData(null);
        return;
      }

    const sorted = [...res.data].sort(
       (a, b) => new Date(a.date) - new Date(b.date)    
      );
      const labels = sorted.map(d => d.date);
      const income = sorted.map(d => d.income);
      const expense = sorted.map(d => d.expense);

      setChartData({
        labels,
        datasets: [
          {
            label: "Income",
            data: income,
            borderColor: "green",
            backgroundColor: "green",
            tension: 0,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: "Expense",
            data: expense,
            borderColor: "red",
            backgroundColor: "red",
            tension: 0,
            pointRadius: 6,
            pointHoverRadius: 8,
          }
        ]
      });
    });
  }, [range]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-60 text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top" }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }}
    />
  );
};

export default DailyExpenseChart;
