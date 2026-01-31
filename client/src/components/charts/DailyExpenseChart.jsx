// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import { getDayWiseData } from "../../services/api";
// import api from "../../services/api";

// const DailyExpenseChart = () => {
//   const [chartData, setChartData] = useState(null);
// useEffect(() => {
//   api.get("/transactions/day-wise").then(res => {
//     setChartData(res.data);
//   });
// }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getDayWiseData();
//       const data = res.data;

//       const labels = data.map(d => d.date);
//       const income = data.map(d => d.income);
//       const expense = data.map(d => d.expense);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Income",
//             data: income,
//             borderColor: "green",
//             backgroundColor: "transparent",
//             tension: 0.4,
//           },
//           {
//             label: "Expense",
//             data: expense,
//             borderColor: "red",
//             backgroundColor: "transparent",
//             tension: 0.4,
//           },
//         ],
//       });
//     };

//     fetchData();
//   }, []);

//   if (!chartData) {
//     return <p className="text-gray-400">No data available</p>;
//   }

//   return (
//     <Line
//       data={chartData}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: "top",
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       }}
//     />
//   );
// };

// export default DailyExpenseChart;











// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const DailyExpenseChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     api.get("/transactions/day-wise").then(res => {
//       const labels = res.data.map(d => d.date);
//       const income = res.data.map(d => d.income);
//       const expense = res.data.map(d => d.expense);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Income",
//             data: income,
//             borderColor: "green",
//             tension: 0.4,
//           },
//           {
//             label: "Expense",
//             data: expense,
//             borderColor: "red",
//             tension: 0.4,
//           },
//         ],
//       });
//     });
//   }, []);

//   return (
//     <Line
//       data={chartData}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: { position: "top" },
//         },
//         scales: {
//           y: { beginAtZero: true },
//         },
//       }}
//     />
//   );
// };

// export default DailyExpenseChart;







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
