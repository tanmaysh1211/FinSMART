import { useRef, useState } from "react";
import api from "../services/api";

export default function AddTransactionModal({ onClose, onSuccess }) {
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    text: "",
    amount: "",
    type: "",
    category: "",
    date: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};
    if (!form.text) e.text = "Required";
    if (!form.amount) e.amount = "Required";
    if (!form.type) e.type = "Select type";
    if (!form.category) e.category = "Select category";
    if (!form.date) e.date = "Pick a date";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // const handleSave = async () => {
  //   if (!validate()) return;

  //   await api.post("/transactions", {
  //     text: form.text,
  //     amount: Number(form.amount),
  //     type: form.type,
  //     category: form.category,
  //     date: form.date
  //   });

  //   onSuccess();  
  //   onClose();   
  // };


  const handleSave = async () => {
  if (!validate()) return;

  try {
    await api.post("/transactions", {
      text: form.text,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date
    });

    // refresh parent table
    if (onSuccess) {
      await onSuccess();
    }

    // close modal
    onClose();

  } catch (error) {
    console.error("Transaction save failed:", error);
    alert("Failed to save transaction");
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 relative">
        <button
          className="absolute top-3 right-3 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

        <input
          name="text"
          value={form.text}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />
        {errors.text && <p className="error">{errors.text}</p>}

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="input"
        />
        {errors.amount && <p className="error">{errors.amount}</p>}

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Type</option>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
        {errors.type && <p className="error">{errors.type}</p>}

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Category</option>
          <option>SALARY</option>
          <option>GIFT</option>
          <option>RENT</option>
          <option>FOOD</option>
          <option>EDUCATION</option>
          <option>TRANSPORTATION</option>
          <option>SHOPPING</option>
          <option>ENTERTAINMENT</option>
        </select>
        {errors.category && <p className="error">{errors.category}</p>}

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="input"
        />
        {errors.date && <p className="error">{errors.date}</p>}

        <button
          onClick={handleSave}
          className="bg-slate-800 text-white px-6 py-2 rounded mt-4"
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
