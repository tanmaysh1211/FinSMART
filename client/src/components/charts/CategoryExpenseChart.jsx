// import { Pie } from "react-chartjs-2";

// export default function CategoryExpenseChart() {
//   return (
//     <div className="w-full h-full">
//       <Pie
//         data={{
//           labels: ["Food", "Rent", "Transport"],
//           datasets: [
//             {
//               data: [40, 35, 25],
//               backgroundColor: ["#f87171", "#60a5fa", "#a78bfa"],
//               borderWidth: 1
//             }
//           ]
//         }}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: "bottom" }
//           }
//         }}
//       />
//     </div>
//   );
// }






// import { Pie } from "react-chartjs-2";
// import { useEffect } from "react";
// import api from "../../services/api";

// export default function CategoryExpenseChart() {
//   useEffect(() => {
//   api.get("/transactions/category-wise").then(res => {
//     setChartData(res.data);
//   });
// }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow h-full">
//       <h4 className="font-semibold mb-2 text-center">
//         Category Wise Expense
//       </h4>

//       {/* <div className="w-48 h-48 mx-auto"> */}
//         <Pie
//           data={{
//             labels: ["Food", "Rent", "Transport"],
//             datasets: [
//               {
//                 data: [40, 35, 25],
//                 backgroundColor: ["#f87171", "#60a5fa", "#a78bfa"],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               legend: {
//                 position: "bottom",
//                 labels: { boxWidth: 12 }
//               }
//             },
//             maintainAspectRatio: false
//           }}
//         />
//       {/* </div> */}
//     </div>
//   );
// }







// import { Pie } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import api from "../../services/api";

// export default function CategoryExpenseChart() {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     api.get("/transactions/category-wise").then(res => {
//       const labels = res.data.map(item => item._id);
//       const values = res.data.map(item => item.total);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             data: values,
//             backgroundColor: [
//               "#f87171",
//               "#60a5fa",
//               "#a78bfa",
//               "#34d399",
//               "#fbbf24",
//             ],
//           },
//         ],
//       });
//     });
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded shadow h-full">
//       <h4 className="font-semibold mb-2 text-center">
//         Category Wise Expense
//       </h4>

//       <Pie
//         data={chartData}
//         options={{
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: { boxWidth: 12 },
//             },
//           },
//           maintainAspectRatio: false,
//         }}
//       />
//     </div>
//   );
// }








// import { Doughnut } from "react-chartjs-2";
// import { useEffect, useState } from "react";
// import { getCategoryWiseExpense } from "../../services/api";

// const COLORS = [
//   "#FF6384",
//   "#36A2EB",
//   "#FFCE56",
//   "#4ADE80",
//   "#A78BFA",
//   "#FB923C",
//   "#22D3EE"
// ];

// const CategoryExpenseChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getCategoryWiseExpense();
//       const data = res.data;

//       // NO EXPENSE DATA
//       if (!data || data.length === 0) {
//         setChartData(null);
//         return;
//       }

//       setChartData({
//         labels: data.map(d => d.category),
//         datasets: [
//           {
//             data: data.map(d => d.total),
//             backgroundColor: COLORS.slice(0, data.length),
//             borderWidth: 0
//           }
//         ]
//       });
//     };

//     fetchData();
//   }, []);

//   if (!chartData) {
//     return (
//       <div className="text-center text-gray-400">
//         No expense data
//       </div>
//     );
//   }

//   return (
//     <Doughnut
//       data={chartData}
//       options={{
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: { position: "bottom" }
//         },
//         cutout: "70%"
//       }}
//     />
//   );
// };

// export default CategoryExpenseChart;





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
