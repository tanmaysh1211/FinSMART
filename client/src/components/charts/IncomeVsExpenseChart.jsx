import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import api from "../../services/api";
import { getIncomeExpense } from "../../services/api";

const IncomeVsExpenseChart = ({range}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getIncomeExpense(range);
       console.log("INCOME EXPENSE API RESPONSE 👉", res.data); // 🔴 MUST SEE
      const data = res.data;

      if (!data || data.length === 0) {
        setChartData(null);
        return;
      }

      const income =
        data.find(d => d._id === "INCOME")?.total || 0;
      const expense =
        data.find(d => d._id === "EXPENSE")?.total || 0;

      if (!data || data.length === 0) {
        setChartData(null);
        return;
      }

      setChartData({
        labels: ["Income", "Expense"],
        datasets: [
          {
            data: [income, expense],
            backgroundColor: ["#86EFAC", "#FB7185"],
            borderWidth: 0,
          }
        ]
      });
    };

    fetchData();
  }, [range]);

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
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
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ₹ ${context.raw}`
            }
          }
        },
        maintainAspectRatio: false
      }}
    />
  );
};

export default IncomeVsExpenseChart;

