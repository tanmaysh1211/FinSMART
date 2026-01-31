import { useEffect, useState } from "react";
import api from "../services/api";

export default function SummaryCards() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    api.get("/transactions/income-expense").then(res => {
      res.data.forEach(item => {
        if (item._id === "INCOME") setIncome(item.total);
        if (item._id === "EXPENSE") setExpense(item.total);
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-green-100 p-4 rounded">
        <p>Total Income</p>
        <h3 className="text-xl font-bold">₹{income}</h3>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <p>Total Expense</p>
        <h3 className="text-xl font-bold">₹{expense}</h3>
      </div>
    </div>
  );
}
