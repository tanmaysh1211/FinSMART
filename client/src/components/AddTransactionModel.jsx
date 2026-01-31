// import { Dialog } from "@headlessui/react";
// import { useState } from "react";

// export default function AddTransactionModal() {
//   const [open, setOpen] = useState(false);
//   const [type, setType] = useState("");

//   const categories = {
//     INCOME: ["SALARY", "GIFT"],
//     EXPENSE: [
//       "FOOD",
//       "RENT",
//       "EDUCATION",
//       "TRANSPORT",
//       "SHOPPING",
//       "ENTERTAINMENT"
//     ]
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed top-24 left-6 bg-indigo-600 text-white px-4 py-2 rounded"
//       >
//         + Add Transaction
//       </button>

//       <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
//         <div className="fixed inset-0 bg-black/40" />
//         <div className="fixed inset-0 flex items-center justify-center">
//           <Dialog.Panel className="bg-white p-6 rounded w-96">
//             <Dialog.Title className="text-xl font-semibold">
//               Add Transaction
//             </Dialog.Title>

//             <input
//               className="w-full border p-2 mt-4 rounded"
//               placeholder="Amount"
//             />

//             <select
//               className="w-full border p-2 mt-3 rounded"
//               onChange={(e) => setType(e.target.value)}
//             >
//               <option value="">Select Type</option>
//               <option value="INCOME">INCOME</option>
//               <option value="EXPENSE">EXPENSE</option>
//             </select>

//             {type && (
//               <select className="w-full border p-2 mt-3 rounded">
//                 {categories[type].map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//             )}

//             <input
//               type="date"
//               className="w-full border p-2 mt-3 rounded"
//             />

//             <button className="mt-4 bg-indigo-600 text-white w-full py-2 rounded">
//               SAVE
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </>
//   );
// }








// import { useRef, useState } from "react";
// import api from "../services/api";

// export default function AddTransactionModal({ onClose }) {
//   const fileRef = useRef(null);

//   const [form, setForm] = useState({
//     text: "",
//     amount: "",
//     type: "",
//     category: "",
//     date: "",
//     image: null
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// const handleSave = async () => {
//   await api.post("/transactions", {
//     text: form.text,
//     amount: Number(form.amount),
//     type: form.type,
//     category: form.category,
//     date: form.date,
//   });

//   onClose();
// };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[420px] p-6 relative">

//         {/* CLOSE */}
//         <button
//           className="absolute top-3 right-3 text-xl"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

//         {/* UPLOAD IMAGE */}
//         <button
//           onClick={() => fileRef.current.click()}
//           className="bg-slate-800 text-white px-4 py-2 rounded mb-4"
//         >
//           Upload Image
//         </button>

//         <input
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//           onChange={(e) =>
//             setForm({ ...form, image: e.target.files[0] })
//           }
//         />

//         {/* TEXT */}
//         <div className="mb-4 flex gap-2">
//           <input
//             name="text"
//             value={form.text}
//             onChange={handleChange}
//             placeholder="eg: rupees 30 on Chai"
//             className="border rounded px-3 py-2 flex-1"
//           />
//           <button className="bg-slate-800 text-white px-4 rounded">
//             SEND
//           </button>
//         </div>

//         {/* AMOUNT */}
//         <input
//           name="amount"
//           type="number"
//           value={form.amount}
//           onChange={handleChange}
//           placeholder="Amount"
//           className="border rounded px-3 py-2 w-full mb-4"
//         />

//         {/* TYPE */}
//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="border rounded px-3 py-2 w-full mb-4"
//         >
//           <option value="">Select Type</option>
//           <option value="INCOME">INCOME</option>
//           <option value="EXPENSE">EXPENSE</option>
//         </select>

//         {/* CATEGORY */}
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           className="border rounded px-3 py-2 w-full mb-4"
//         >
//           <option value="">Select Category</option>
//           <option>SALARY</option>
//           <option>GIFT</option>
//           <option>RENT</option>
//           <option>FOOD</option>
//           <option>EDUCATION</option>
//           <option>TRANSPORTATION</option>
//           <option>SHOPPING</option>
//           <option>ENTERTAINMENT</option>
//         </select>

//         {/* DATE */}
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           className="border rounded px-3 py-2 w-full mb-6"
//         />

//         {/* SAVE */}
//         <button
//   onClick={handleSave}
//   className="bg-slate-800 text-white px-6 py-2 rounded"
// >
//   SAVE
// </button>

//       </div>
//     </div>
//   );
// }








// import { useRef, useState } from "react";
// import api from "../services/api";

// export default function AddTransactionModal({ onClose }) {
//   const fileRef = useRef(null);

//   const [form, setForm] = useState({
//     text: "",
//     amount: "",
//     type: "",
//     category: "",
//     date: "",
//     image: null
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.text) e.text = "Required";
//     if (!form.amount) e.amount = "Required";
//     if (!form.type) e.type = "Select type";
//     if (!form.category) e.category = "Select category";
//     if (!form.date) e.date = "Pick a date";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSave = async () => {
//     if (!validate()) return; // 🚫 BLOCK SAVE

//     await api.post("/transactions", {
//       text: form.text,
//       amount: Number(form.amount),
//       type: form.type,
//       category: form.category,
//       date: form.date,
//     });

//     onClose(); // ✅ close ONLY after success
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl w-[420px] p-6 relative">

//         {/* CLOSE */}
//         <button
//           className="absolute top-3 right-3 text-xl"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

//         {/* UPLOAD IMAGE */}
//         <button
//           onClick={() => fileRef.current.click()}
//           className="bg-slate-800 text-white px-4 py-2 rounded mb-4"
//         >
//           Upload Image
//         </button>

//         <input
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//           onChange={(e) =>
//             setForm({ ...form, image: e.target.files[0] })
//           }
//         />

//         {/* TEXT */}
//         <input
//           name="text"
//           value={form.text}
//           onChange={handleChange}
//           placeholder="eg: rupees 30 on Chai"
//           className="input"
//         />
//         {errors.text && <p className="error">{errors.text}</p>}

//         {/* AMOUNT */}
//         <input
//           name="amount"
//           type="number"
//           value={form.amount}
//           onChange={handleChange}
//           placeholder="Amount"
//           className="input"
//         />
//         {errors.amount && <p className="error">{errors.amount}</p>}

//         {/* TYPE */}
//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="">Select Type</option>
//           <option value="INCOME">INCOME</option>
//           <option value="EXPENSE">EXPENSE</option>
//         </select>
//         {errors.type && <p className="error">{errors.type}</p>}

//         {/* CATEGORY */}
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="">Select Category</option>
//           <option>SALARY</option>
//           <option>GIFT</option>
//           <option>RENT</option>
//           <option>FOOD</option>
//           <option>EDUCATION</option>
//           <option>TRANSPORTATION</option>
//           <option>SHOPPING</option>
//           <option>ENTERTAINMENT</option>
//         </select>
//         {errors.category && <p className="error">{errors.category}</p>}

//         {/* DATE */}
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           className="input"
//         />
//         {errors.date && <p className="error">{errors.date}</p>}

//         {/* SAVE */}
//         <button
//           onClick={handleSave}
//           className="bg-slate-800 text-white px-6 py-2 rounded mt-4"
//         >
//           SAVE
//         </button>
//       </div>
//     </div>
//   );
// }










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

  //   onSuccess();   // 🔥 THIS IS MANDATORY
  //   onClose();     // close modal
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
