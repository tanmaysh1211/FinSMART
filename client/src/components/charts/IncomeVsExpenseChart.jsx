// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import { getDayWiseData } from "../../services/api";

// export default function IncomeVsExpenseChart() {
//   const [data, setData] = useState([]);
//   const hasData = data.length > 0;

//   useEffect(() => {
//     getDayWiseData().then(res => setData(res.data));
//   }, []);

//   // ---------------- EMPTY STATE (IMAGE 1) ----------------
//   if (!hasData) {
//     return (
//       <div className="h-[260px] flex items-center justify-center text-gray-400">
//         No data available
//       </div>
//     );
//   }

//   // ---------------- DATA STATE (IMAGE 2) ----------------
//   return (
//     <Line
//       data={{
//         labels: data.map(d => d.date),
//         datasets: [
//           {
//             label: "Income",
//             data: data.map(d => d.income),
//             borderColor: "green",
//             backgroundColor: "rgba(0,128,0,0.2)",
//             tension: 0.4,
//           },
//           {
//             label: "Expense",
//             data: data.map(d => d.expense),
//             borderColor: "red",
//             backgroundColor: "rgba(255,0,0,0.2)",
//             tension: 0.4,
//           }
//         ]
//       }}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//       }}
//     />
//   );
// }




// import { Bar } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function IncomeVsExpenseChart() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     api.get("/transactions/income-expense")
//       .then((res) => {
//         if (res.data.length === 0) {
//           setData(null);
//           return;
//         }

//         const income =
//           res.data.find(d => d._id === "INCOME")?.total || 0;
//         const expense =
//           res.data.find(d => d._id === "EXPENSE")?.total || 0;

//         setData({
//           labels: ["Income", "Expense"],
//           datasets: [
//             {
//               label: "Amount",
//               data: [income, expense],
//               backgroundColor: ["#22c55e", "#ef4444"]
//             }
//           ]
//         });
//       });
//   }, []);

//   if (!data) {
//     return (
//       <div className="flex items-center justify-center h-48 text-gray-400">
//         No data available
//       </div>
//     );
//   }

//   return <Bar data={data} />;
// }





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

