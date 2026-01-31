// const TransactionSummary = () => {
//   return (
//     <div className="flex justify-center mb-6">
//       <div className="bg-[#F2FBF8] rounded-xl px-8 py-4 shadow flex items-center gap-8">
//         <div className="text-sm">
//           <span className="font-medium">Last 365 days →</span>
//           <select className="ml-2 border rounded px-2 py-1">
//             <option>LifeTime</option>
//             <option>last 30 days</option>
//             <option>last 60 days</option>
//             <option>last 90 days</option>
//             <option>last week</option>
//           </select>
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-gray-500">Total Income</p>
//           <p className="font-semibold">₹ 0</p>
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-gray-500">Total Expense</p>
//           <p className="font-semibold">₹ 0</p>
//         </div>

//         <div className="text-center">
//           <p className="text-sm text-gray-500">Balance</p>
//           <p className="font-semibold">₹ 0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionSummary;






// const TransactionSummary = () => {
//   return (
//     <div className="bg-[#F2FBF8] rounded-xl px-8 py-5 shadow w-fit">
      
//       {/* 🔹 TOP ROW */}
//       <div className="flex items-center gap-3 mb-4">
//         <span className="font-medium text-sm">
//           Last 365 days →
//         </span>

//         <select className="border rounded px-3 py-1 text-sm">
//           <option>LifeTime</option>
//           <option>Last 30 days</option>
//           <option>Last 60 days</option>
//           <option>Last 90 days</option>
//           <option>Last Week</option>
//         </select>
//       </div>

//       {/* 🔹 BOTTOM ROW */}
//       <div className="flex gap-10 text-center">
//         <div>
//           <p className="text-sm text-gray-500">Total Income</p>
//           <p className="font-semibold text-lg">₹ 0</p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Total Expense</p>
//           <p className="font-semibold text-lg">₹ 0</p>
//         </div>

//         <div>
//           <p className="text-sm text-gray-500">Balance</p>
//           <p className="font-semibold text-lg">₹ 0</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default TransactionSummary;



import { useState , useMemo } from "react";

const TransactionSummary = ({ transactions , range , setRange }) => {
  // const [range, setRange] = useState("365");
//   const filteredByDate = useMemo(() => {
//   const days = parseInt(range); // 7,30,60,90,365
//   const now = new Date();

//   return transactions.filter((t) => {
//     const txDate = new Date(t.date);
//     const diffTime = now - txDate;
//     const diffDays = diffTime / (1000 * 60 * 60 * 24);

//     return diffDays <= days;
//   });
// }, [transactions, range]);


let income = 0;
let expense = 0;

transactions.forEach((t) => {
  if (t.type.toUpperCase() === "INCOME") {
    income += t.amount;
  } else if (t.type.toUpperCase() === "EXPENSE") {
    expense += t.amount;
  }
});

const balance = income - expense;


  return (
    <div className="bg-[#F2FBF8] rounded-xl px-4 sm:px-8 py-4 shadow">
      {/* <div className="text-sm mb-2"> */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm mb-4">
        <span className="font-medium">Last 365 days →</span>
        <select value={range} onChange={(e) => setRange(e.target.value)} className="ml-2 border rounded px-2 py-1">
          <option value="365">LifeTime</option>
          <option value="7">Last week</option>
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* <div className="flex gap-8">
        <div className="text-center"> */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="font-semibold">₹ {income}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="font-semibold">₹ {expense}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className={`font-semibold ${balance < 0 ? "text-red-600" : ""}`}>
            ₹ {balance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;

