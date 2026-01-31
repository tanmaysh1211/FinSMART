import { useState } from "react";
import api from "../services/api";

export default function EditTransactionModal({ tx, onClose, onSuccess }) {
  const [form, setForm] = useState({
    amount: tx.amount,
    type: tx.type,
    category: tx.category,
    date: tx.date.slice(0, 10)
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await api.put(`/transactions/${tx._id}`, form);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3">✕</button>

        <h2 className="text-lg font-semibold mb-4">Edit Transaction</h2>

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="input"
        />

        <select name="type" value={form.type} onChange={handleChange} className="input">
          <option>INCOME</option>
          <option>EXPENSE</option>
        </select>

        <select name="category" value={form.category} onChange={handleChange} className="input">
          <option>FOOD</option>
          <option>RENT</option>
          <option>TRANSPORTATION</option>
          <option>ENTERTAINMENT</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
        />

        <button
          onClick={handleUpdate}
          className="bg-slate-800 text-white px-6 py-2 rounded mt-4"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
}
