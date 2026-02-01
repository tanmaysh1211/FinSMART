import { useEffect, useState } from "react";
// import api from "../services/api";
import { getIncomeExpense } from "../services/api";

export default function SpendingOverview({range}) {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    getIncomeExpense(range).then(res => {
      let inc = 0;
let exp = 0;

res.data.forEach(d => {
  if (d._id === "INCOME") inc = d.total;
  if (d._id === "EXPENSE") exp = d.total;
});
setIncome(inc);
setExpense(exp);
    });
  }, [range]);

  const percentage =
  income === 0 ? 0 : Math.min(100, Math.round((expense / income) * 100));


  const angle = -180 + (percentage / 100) * 180;

  const R = 110;                 // radius
  const CX = 140;                // center X
  const CY = 140;                // center Y
  const CIRC = Math.PI * R;      // semicircle circumference
  const FILLED = (percentage / 100) * CIRC;

  return (
    <div className="bg-[#F2FBF8] rounded-xl p-5 h-full">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <p className="text-sm font-medium">
        {range === "365" ? "LifeTime" : `Last ${range} days`} →
      </p>

      </div>

      {/* SUMMARY */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-green-200 px-4 py-2 rounded-xl w-32 text-center">
          <p className="text-xs font-semibold">TOTAL INCOME</p>
          <p className="text-lg font-bold">₹ {income}</p>
        </div>
        <div className="bg-red-200 px-4 py-2 rounded-xl w-32 text-center">
          <p className="text-xs font-semibold">TOTAL EXPENSE</p>
          <p className="text-lg font-bold">₹ {expense}</p>
        </div>
      </div>

      {/* GAUGE */}
      <div className="relative w-[280px] h-[150px] mx-auto">
        <svg width="280" height="150">
          {/* Base arc */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Filled arc */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="#2563EB"
            strokeWidth="18"
            strokeDasharray={`${FILLED} ${CIRC}`}
            strokeLinecap="round"
          />
        </svg>

        {/* NEEDLE (FIXED CENTER, FIXED LENGTH) */}
        <div
          className="absolute"
          style={{
            left: `${CX}px`,
            top: `${CY}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "0% 50%",
          }}
        >
          <div className="w-[100px] h-[3px] bg-red-600" />
        </div>

        {/* PIVOT */}
        <div
          className="absolute w-4 h-4 bg-red-600 rounded-full"
          style={{
            left: `${CX - 8}px`,
            top: `${CY - 8}px`,
          }}
        />
      </div>

      <p className="text-center mt-3 font-medium">
        {Math.round(percentage)}% income spent
      </p>
    </div>
  );
}
