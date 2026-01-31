import api from "../services/api";

export default function DeleteTransactionModal({ tx, onClose, onSuccess }) {
  const handleDelete = async () => {
    await api.delete(`/transactions/${tx._id}`);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3">✕</button>

        <h2 className="text-lg font-semibold mb-2">Delete Transaction?</h2>

        <p className="text-sm mb-4">
          Amount: {tx.amount}, Type: {tx.type}, Category: {tx.category}
        </p>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
