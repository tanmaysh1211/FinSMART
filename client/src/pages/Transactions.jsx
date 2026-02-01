import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransactionSummary from "../components/TransactionSummary";
import AddTransactionModal from "../components/AddTransactionModel";
import api from "../services/api";
import EditTransactionModal from "../components/EditTransactionalModal";
import DeleteTransactionModal from "../components/DeleteTransactionalModal";

const Transactions = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [filterMode, setFilterMode] = useState("all"); // all | category | type
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedType, setSelectedType] = useState("");

const [range, setRange] = useState("365"); // timeline

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    console.log("API DATA:", res.data); // 🔥 IMPORTANT
    setTransactions(res.data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const [editTx, setEditTx] = useState(null);
const [deleteTx, setDeleteTx] = useState(null);

const filteredTransactions = transactions.filter((txn) => {
  // 1️⃣ Timeline filter
  const now = new Date();
  const txDate = new Date(txn.date);
  const diffDays = (now - txDate) / (1000 * 60 * 60 * 24);

  if (diffDays > parseInt(range)) return false;

  // 2️⃣ Category filter
  if (filterMode === "category" && selectedCategory) {
    return txn.category?.toLowerCase() === selectedCategory.toLowerCase();
  }

  // 3️⃣ Type filter
  if (filterMode === "type" && selectedType) {
    return txn.type?.toLowerCase() === selectedType.toLowerCase();
  }

  return true;
});

  return (
    <>
      <Navbar />

      <div className="p-4 sm:p-6 space-y-6">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
  <div className="flex flex-wrap gap-3 items-center">
  <span className="text-sm">Filter</span>

  <select
    value={filterMode}
    onChange={(e) => {
      setFilterMode(e.target.value);
      setSelectedCategory("");
      setSelectedType("");
      setRange("365");
    }}
    className="border px-3 py-2 rounded text-sm"
  >
    <option value="all">All</option>
    <option value="category">Category</option>
    <option value="type">Type</option>
  </select>

  {filterMode === "category" && (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border px-3 py-2 rounded text-sm"
    >
      <option value="">Category</option>
      <option value="FOOD">FOOD</option>
      <option value="RENT">RENT</option>
      <option value="SHOPPING">SHOPPING</option>
    </select>
  )}

  {filterMode === "type" && (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="border px-3 py-2 rounded text-sm"
    >
      <option value="">Type</option>
      <option value="income">INCOME</option>
      <option value="expense">EXPENSE</option>
    </select>
  )}
</div>


          {/* <TransactionSummary transactions={filteredTransactions} /> */}
          <TransactionSummary transactions={filteredTransactions} range={range} setRange={setRange}/>


          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="bg-slate-800 text-white px-4 py-2 rounded"
              onClick={() => setOpen(true)}
            >
              + Add transaction
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/dashboard")}
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* <div className="bg-white rounded-xl shadow overflow-hidden"> */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#1E2F4D] text-white">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount (₹)</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-24 text-center text-gray-400">
                    No data
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx._id} className="border-b hover:bg-gray-100 transition">
                    <td className="p-3">{tx.date.slice(0,10)}</td>
                    <td className="p-3">₹ {tx.amount}</td>
                    <td className="p-3">{tx.category}</td>
                    <td className="p-3">{tx.type.toLowerCase()}</td>
                    <td className="p-3">
    <div className="flex items-center gap-4">
      <button onClick={() => {setDeleteTx(null);setEditTx(tx);}} className="hover:scale-110 transition;hover:text-blue-600">
        ✏️</button>
      <button onClick={() => {setEditTx(null);setDeleteTx(tx);}}className="hover:scale-110 transition;hover:text-red-600">
        🗑️</button>
    </div>
  </td>

    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <AddTransactionModal
          onClose={() => setOpen(false)}
          onSuccess={fetchTransactions}
        />
      )}

{editTx && (
  <EditTransactionModal
    tx={editTx}
    onClose={() => setEditTx(null)}
    onSuccess={() => {
      setEditTx(null);
      fetchTransactions();
    }}
  />
)}

{deleteTx && (
  <DeleteTransactionModal
    tx={deleteTx}
    onClose={() => setDeleteTx(null)}
    onSuccess={() => {
      setDeleteTx(null);
      fetchTransactions();
    }}
  />
)}

    </>
  );
};

export default Transactions;
