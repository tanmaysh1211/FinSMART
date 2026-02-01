import express from "express";
import Transaction from "../models/Transaction.js";
import authMiddleware from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
const router = express.Router();

/* ADD TRANSACTION */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const tx = await Transaction.create({
      user: req.user.id,   
      text: req.body.text,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: new Date(req.body.date),
    });

    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user.id,
  }).sort({ date: -1 });

  res.json(transactions);
});

/* UPDATE TRANSACTION */
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Transaction.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  res.json(updated);
});

/* DELETE TRANSACTION */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.json({ success: true });
});

function getFromDate(days) {
  if (!days || days === "365") return null;
  const d = new Date();
  d.setDate(d.getDate() - Number(days));
  return d;
}

/* INCOME vs EXPENSE */
router.get("/income-expense", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
const fromDate = getFromDate(req.query.days);

const match = { user: userId };
if (fromDate) match.date = { $gte: fromDate };

    const data = await Transaction.aggregate([
      {
        // $match: {
        //   user: userId  
        // }
        $match:match
      },
      {
        $group: {
          _id: "$type",  // INCOME / EXPENSE
          total: { $sum: "$amount" }
        }
      }
    ]);

    console.log("INCOME EXPENSE AGG -> ", data);
    res.json(data);
  } catch (err) {
    console.error("INCOME EXPENSE ERROR ", err);
    res.status(500).json({ message: "Failed income-expense aggregation" });
  }
});

/* DAY WISE EXPENSE */
router.get("/day-wise", authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    const last365 = new Date();
    last365.setDate(today.getDate() - 365);

    console.log("USER ID:", req.user.id); // 🔍 DEBUG

    const fromDate = getFromDate(req.query.days);

const match = {
  user: new mongoose.Types.ObjectId(req.user.id)
};
if (fromDate) match.date = { $gte: fromDate };

    const data = await Transaction.aggregate([
      {
        // $match: {
        //   user: new mongoose.Types.ObjectId(req.user.id), 
        //   date: { $gte: last365 }
        // }

        $match:match
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$date"
              }
            },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    const map = {};

    data.forEach(d => {
      const date = d._id.date;
      if (!map[date]) {
        map[date] = { date, income: 0, expense: 0 };
      }

      if (d._id.type === "INCOME") map[date].income = d.total;
      if (d._id.type === "EXPENSE") map[date].expense = d.total;
    });

    const result = Object.values(map);
    console.log("DAY WISE RESULT:", result);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Day-wise aggregation failed" });
  }
});


/* TOTAL TRANSACTIONS */
router.get("/total", authMiddleware, async (req, res) => {
  try {

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const fromDate = getFromDate(req.query.days);

    const match = { user: userId };
    if (fromDate) match.date = { $gte: fromDate };

    const data = await Transaction.aggregate([
      {
        // $match: {
        //   user: new mongoose.Types.ObjectId(req.user.id)
        // }

        $match:match
      },
      {
        $group: {
          _id: "$type",       // INCOME / EXPENSE
          total: { $sum: 1 }  // COUNT documents
        }
      }
    ]);

    console.log("TOTAL TRANSACTION COUNT:", data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Total transaction count failed" });
  }
});

/* CATEGORY WISE EXPENSE */
router.get("/category-wise", authMiddleware, async (req, res) => {
  try {
    const today = new Date();
    const last365 = new Date();
    last365.setDate(today.getDate() - 365);

    const fromDate = getFromDate(req.query.days);

const match = {
  user: new mongoose.Types.ObjectId(req.user.id),
  type: "EXPENSE"
};

if (fromDate) match.date = { $gte: fromDate };

    const data = await Transaction.aggregate([
      {
        // $match: {
        //   user: new mongoose.Types.ObjectId(req.user.id), 
        //   type: "EXPENSE",
        //   date: { $gte: last365 }
        // }
        $match:match
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    console.log("CATEGORY AGG RESULT:", data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Category-wise aggregation failed" });
  }
});
export default router;

