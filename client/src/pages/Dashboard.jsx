import Navbar from "../components/Navbar";
import CategoryExpenseChart from "../components/charts/CategoryExpenseChart";
import IncomeVsExpenseChart from "../components/charts/IncomeVsExpenseChart";
import DailyExpenseChart from "../components/charts/DailyExpenseChart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TotalTransactionsChart from "../components/charts/TotalTransactionsChart";
import SpendingOverview from "../components/SpendingOverview";
import { useState } from "react";
import AddTransactionModal from "../components/AddTransactionModel";

const Dashboard = () => {
    const [params] = useSearchParams();
  const { setUser } = useAuth();
  const [open , setOpen] = useState(false);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setUser({ token });
    }
  }, []);
  const navigate = useNavigate();
const [range, setRange] = useState("365");

  return (
    <>
      <Navbar />

     <div className="p-4 sm:p-6 space-y-6">
  {/* TOP BUTTONS */}
  <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
    <button
  className="bg-primary text-white px-4 py-2 rounded"
  onClick={() => setOpen(true)}
>
  + Add transaction
</button>

<select
  value={range}
  onChange={(e) => setRange(e.target.value)}
  className="border px-2 py-1 rounded text-sm"
>
  <option value="7">last week</option>
  <option value="30">last 30 days</option>
  <option value="60">last 60 days</option>
  <option value="90">last 90 days</option>
  <option value="365">LifeTime</option>
</select>


    <button
      className="bg-blue-600 text-white px-4 py-2 rounded"
      onClick={() => navigate("/transactions")}
    >
      View Transactions
    </button>
  </div>

  {/* ROW 1 */}
  {/* <div className="grid grid-cols-12 gap-6 mb-6"> */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">


    {/* LEFT CARD */}
    {/* <div className="col-span-4 bg-white rounded-xl p-5 shadow">
      <SummaryCards />
      <Gauge />
    </div> */}

    <div className="col-span-12 lg:col-span-4 bg-[#F2FBF8] rounded-xl shadow min-h-[300px]">
  <SpendingOverview range={range} />
</div>


    {/* MIDDLE CARD */}
    {/* <div className="col-span-4 bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-1">Category Wise Expense</h3>
      <p className="text-sm text-gray-500 mb-4">Last 365 days</p>

      <div className="flex justify-center">
        <div className="w-[220px] h-[220px]">
          <CategoryExpenseChart />
        </div>
      </div>
    </div> */}

    <div className="col-span-12 lg:col-span-4 bg-[#F2FBF8] rounded-xl shadow p-5 min-h-[300px]">
  <h3 className="font-semibold mb-1">Category Wise Expense</h3>
  <p className="text-sm text-gray-500 mb-4">
    {range === "365" ? "LifeTime" : `Last ${range} days`}
  </p>

  <div className="h-[220px]">
    <CategoryExpenseChart range={range} />
  </div>
</div>

{/* Total Transactions */}
  <div className="col-span-12 lg:col-span-4 bg-[#F2FBF8] rounded-xl shadow min-h-[300px]">
    <TotalTransactionsChart range={range} />
  </div>

  </div>

  {/* ROW 2 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


     {/* Income vs Expense */}  
  <div className="col-span-12 lg:col-span-5 bg-white rounded-xl shadow p-5 min-h-[300px]">
    <h3 className="font-semibold mb-3">Income vs Expense</h3>
    <div className="h-[240px]">
      <IncomeVsExpenseChart range={range}/>
    </div>
  </div>


     {/* Day-wise chart (WIDE) */}
  <div className="col-span-12 lg:col-span-7 bg-white rounded-xl shadow p-5 min-h-[300px]">
    <h3 className="font-semibold mb-3">Day Wise Income & Expense</h3>
    <div className="h-[240px]">
      <DailyExpenseChart range={range}/>
    </div>
  </div>

  </div>
</div>
{open && <AddTransactionModal onClose={() => setOpen(false)} />}

    </>
  );
};

export default Dashboard;
