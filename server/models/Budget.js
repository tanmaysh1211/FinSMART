import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  category: String,
  date: Date,
});

export default mongoose.model("Transaction", transactionSchema);
