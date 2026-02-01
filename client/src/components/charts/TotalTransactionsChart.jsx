import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {getTotalTransactions} from "../../services/api";

const TotalTransactionsChart = ({range}) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getTotalTransactions(range).then(res => {
      console.log("TOTAL TX API:", res.data);
      let inc = 0;
    let exp = 0;

    res.data.forEach(item => {
      if (item._id === "INCOME") inc = item.total;
      if (item._id === "EXPENSE") exp = item.total;
    });

    setIncome(inc);
    setExpense(exp);
    });
  }, [range]);

  const total = income + expense;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Total Transactions",
        data: [income, expense],
        backgroundColor:[
          "#86EFAC",
          "#FCA5A5",
        ],
        barThickness: 50,
        borderRadius:6
      },
    ],
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-center font-bold text-xl">
        TOTAL TRANSACTIONS - {total}
      </h2>
      <p className="text-center text-sm text-gray-500 mb-2">
        {range === "365" ? "LifeTime" : `Last ${range} days`}
      </p>

      <div className="flex-1 flex items-center justify-center px-4">
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
            scales: {
              y: {
                min: 0,
                max: total === 0 ? 1 : undefined,
                 ticks: {
          stepSize: 1,     // 🔥 forces 0,1,2,3,4,5
          precision: 0,    // 🔥 no decimals ever
        },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TotalTransactionsChart;
