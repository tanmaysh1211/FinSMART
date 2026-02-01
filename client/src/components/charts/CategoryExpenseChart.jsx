import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getCategoryWiseExpense } from "../../services/api";

const COLORS = [
  "#FF6384", // pink
  "#36A2EB", // blue
  "#FFCE56", // yellow
  "#4ADE80", // green
  "#A78BFA", // purple
  "#FB923C", // orange
  "#22D3EE"  // cyan
];

const CategoryExpenseChart = ({range}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryWiseExpense(range);
      const data = res.data;

      if (!data || data.length === 0) {
        setChartData(null);
        return;
      }

      setChartData({
        labels: data.map(d => d.category),
        datasets: [
          {
            data: data.map(d => d.total),
            backgroundColor: COLORS.slice(0, data.length),
            borderWidth: 0
          }
        ]
      });
    };

    fetchData();
  }, [range]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No expense data
      </div>
    );
  }

  return (
    <Doughnut
      data={chartData}
      options={{
        cutout: "70%",
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                return `${label} — total: ₹ ${value}`;
              }
            }
          }
        },
        maintainAspectRatio: false
      }}
    />
  );
};

export default CategoryExpenseChart;
