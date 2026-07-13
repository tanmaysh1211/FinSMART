import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  const { text, amount, type, category, date } = req.body;

  const tx = await Transaction.create({
    user: req.userId,
    text,
    amount,
    type,
    category,
    date,
  });

  res.json(tx);
};

export const summary = async (req, res) => {
  const result = await Transaction.aggregate([
    { $match: { user: req.userId } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);
  res.json(result);
};

export const categoryWise = async (req, res) => {
  const data = await Transaction.aggregate([
    { $match: { user: req.userId, type: "EXPENSE" } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
  res.json(data);
};

export const dayWise = async (req, res) => {
  const data = await Transaction.aggregate([
    { $match: { user: req.userId } },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.date": 1 } },
  ]);

  res.json(data);
};

export const totalTransactions = async (req, res) => {
  const count = await Transaction.countDocuments({ user: req.userId });
  res.json({ count });
};
