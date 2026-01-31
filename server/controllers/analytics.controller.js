import Transaction from "../models/Transaction.js";

export const summary = async (req, res) => {
  const data = await Transaction.aggregate([
    { $match: { userId: req.user.id } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);
  res.json(data);
};
