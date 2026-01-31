// export default function SpendingOverview() {
//   return (
//     <div className="bg-[#F2FBF8] rounded-xl p-5 h-full">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-sm font-medium">Last 365 days →</p>
//         <select className="border px-2 py-1 rounded text-sm">
//           <option>last week</option>
//           <option>last 30 days</option>
//           <option>Last 60 days</option>
//           <option>last 90 days</option>
//           <option>LifeTime</option>
//         </select>
//       </div>

//       {/* SUMMARY PILLS */}
//       <div className="flex gap-4 justify-center mb-6">
//         <div className="bg-green-200 text-center px-4 py-2 rounded-xl w-32">
//           <p className="text-xs font-semibold">TOTAL INCOME</p>
//           <p className="text-lg font-bold">₹ 0</p>
//         </div>

//         <div className="bg-red-200 text-center px-4 py-2 rounded-xl w-32">
//           <p className="text-xs font-semibold">TOTAL EXPENSE</p>
//           <p className="text-lg font-bold">₹ 0</p>
//         </div>
//       </div>

//       {/* GAUGE (FAKE SEMI-CIRCLE) */}
//       {/* <div className="relative flex justify-center mt-6"> */}
//         {/* semi circle */}
//         {/* <div className="w-48 h-24 border-t-[14px] border-gray-300 rounded-t-full" /> */}

//         {/* needle */}
//         {/* <div className="absolute bottom-0 w-24 h-[2px] bg-red-600 rotate-[10deg] origin-left" />
//         <div className="absolute bottom-0 w-3 h-3 bg-red-600 rounded-full" /> */}
//       {/* </div> */}

//         {/* GAUGE */}
// <div className="relative w-[280px] h-[140px] mx-auto mt-6">

//   {/* SEMICIRCLE ARC (thick + heavy like image 2) */}
//  {/* SEMICIRCLE ARC */}
//   <svg
//     width="250"
//     height="150"
//     viewBox="0 0 280 160"
//     className="absolute inset-0"
//   >
//     <path
//       d="M20 140 A120 120 0 0 1 260 140"
//       fill="none"
//       stroke="#D1D5DB"
//       strokeWidth="22"
//       strokeLinecap="round"
//     />
//   </svg>
  
//    {/* NEEDLE (TRUE CENTER OF FULL CIRCLE) */}
//   <div
//     className="absolute"
//     style={{
//       left: "120px",   // center X
//       top: "115px",    // center Y  ← THIS WAS YOUR MAIN ISSUE
//       transform: "translate(-50%, -50%)",
//     }}
//   >
//     {/* pivot */}
//     <div className="absolute w-4 h-4 bg-red-600 rounded-full z-10" />

//     {/* needle — LENGTH = RADIUS */}
//     <div
//       className="absolute h-[3px] bg-red-600 origin-left"
//       style={{
//         width: "110px",        // exactly radius
//         left:"4px",
//         transform: "rotate(-190deg)", // touches LEFT arc end
//       }}
//     />
//   </div>
// </div>
//     </div>
//   );
// }








// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function SpendingOverview() {
//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);

//   useEffect(() => {
//     api.get("/transactions/income-expense").then(res => {
//       res.data.forEach(item => {
//         if (item._id === "INCOME") setIncome(item.total);
//         if (item._id === "EXPENSE") setExpense(item.total);
//       });
//     });
//   }, []);

//   const spentPercent =
//     income === 0 ? 0 : Math.min(100, Math.round((expense / income) * 100));

//   /* SVG math */
//   const radius = 110;
//   const circumference = Math.PI * radius; // half circle
//   const filledLength = (spentPercent / 100) * circumference;

//   /* Needle angle: -180° (left) → 0° (right) */
//   const needleAngle = -180 + (spentPercent * 180) / 100;

//   return (
//     <div className="bg-[#F2FBF8] rounded-xl p-5 h-full">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-sm font-medium">Last 365 days →</p>
//         <select className="border px-2 py-1 rounded text-sm">
//           <option>LifeTime</option>
//         </select>
//       </div>

//       {/* Totals */}
//       <div className="flex gap-4 justify-center mb-6">
//         <div className="bg-green-200 text-center px-4 py-2 rounded-xl w-32">
//           <p className="text-xs font-semibold">TOTAL INCOME</p>
//           <p className="text-lg font-bold">₹ {income}</p>
//         </div>

//         <div className="bg-red-200 text-center px-4 py-2 rounded-xl w-32">
//           <p className="text-xs font-semibold">TOTAL EXPENSE</p>
//           <p className="text-lg font-bold">₹ {expense}</p>
//         </div>
//       </div>

//       {/* Gauge */}
//       <div className="relative w-[280px] h-[160px] mx-auto">
//         <svg width="280" height="160" viewBox="0 0 280 160">
//           {/* Background arc */}
//           <path
//             d="M30 140 A110 110 0 0 1 250 140"
//             fill="none"
//             stroke="#D1D5DB"
//             strokeWidth="20"
//             strokeLinecap="round"
//           />

//           {/* Filled progress arc */}
//           <path
//             d="M30 140 A110 110 0 0 1 250 140"
//             fill="none"
//             stroke="#2563EB"
//             strokeWidth="20"
//             strokeLinecap="round"
//             strokeDasharray={`${filledLength} ${circumference}`}
//           />
//         </svg>

//         {/* Needle */}
//         <div
//           className="absolute left-1/2 bottom-[20px]"
//           style={{
//             transform: `translateX(-50%) rotate(${needleAngle}deg)`,
//             transformOrigin: "left center",
//           }}
//         >
//           <div className="w-[100px] h-[3px] bg-red-600" />
//           <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-600 rounded-full" />
//         </div>
//       </div>

//       {/* Label */}
//       <p className="text-center mt-2 font-semibold">
//         {spentPercent}% income spent
//       </p>
//     </div>
//   );
// }













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

  // const percentage =
  //   income === 0 ? 0 : Math.min((expense / income) * 100, 100);

  const percentage =
  income === 0 ? 0 : Math.min(100, Math.round((expense / income) * 100));


  const angle = -180 + (percentage / 100) * 180;
    // const angle = -90 + percentage  * 1.8;

  // Geometry
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
