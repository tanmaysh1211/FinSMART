import Transaction from "../models/Transaction.js";
import OpenAI from "openai";

const getDateFilter = (dateRange) => {
  const now = new Date();
  switch (dateRange) {
    case "last_week":
      return new Date(new Date().setDate(now.getDate() - 7));
    case "last_month":
      return new Date(new Date().setDate(now.getDate() - 30));
    case "last_3_months":
      return new Date(new Date().setMonth(now.getMonth() - 3));
    case "lifetime":
    default:
      return null;
  }
};

const buildFinanceSummary = (transactions) => {
  if (!transactions.length)
    return "The user has no transactions in this time period.";

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryMap = {};
  transactions
    .filter((t) => t.type === "EXPENSE")
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

  const categoryBreakdown = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([cat, amt]) => `  - ${cat}: ₹${amt}`)
    .join("\n");

  const dayMap = {};
  transactions
    .filter((t) => t.type === "EXPENSE")
    .forEach((t) => {
      const day = new Date(t.date).toISOString().split("T")[0];
      dayMap[day] = (dayMap[day] || 0) + t.amount;
    });

  const sortedDays = Object.entries(dayMap).sort((a, b) => b[1] - a[1]);
  const highestDay = sortedDays[0];

  const transactionList = transactions
    .map(
      (t) =>
        `  - [${new Date(t.date).toDateString()}] ${t.type} ₹${t.amount} | Category: ${t.category}${t.text ? ` | Note: ${t.text}` : ""}`
    )
    .join("\n");

  return `
FINANCIAL SUMMARY:
- Total Income : ₹${totalIncome}
- Total Expense: ₹${totalExpense}
- Net Balance  : ₹${totalIncome - totalExpense}
- Transactions : ${transactions.length}

CATEGORY-WISE EXPENSE BREAKDOWN:
${categoryBreakdown || "  No expenses found"}

HIGHEST SPENDING DAY:
  ${highestDay ? `${highestDay[0]} — ₹${highestDay[1]}` : "No expense data"}

ALL TRANSACTIONS:
${transactionList}
  `.trim();
};

export const chatMessage = async (req, res) => {
  try {
    const { message, dateRange = "last_week" } = req.body;
    const userId = req.user.id;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const dateFilter = getDateFilter(dateRange);
    const query = { user: userId };
    if (dateFilter) query.date = { $gte: dateFilter };
    const transactions = await Transaction.find(query).sort({ date: 1 });
    const financeSummary = buildFinanceSummary(transactions);

    const systemPrompt = `
You are FinSmart AI, a smart and friendly personal finance assistant.
Your job is to answer the user's finance questions based ONLY on the data provided below.
Be concise, accurate, and helpful. Always use ₹ (Indian Rupees) for amounts.
Do not make up data. If the data is insufficient to answer, say so clearly.

Here is the user's financial data:
${financeSummary}
    `.trim();
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
  model: "gpt-4o-mini",
  input: [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: message,
    },
  ],
});

const reply = response.output_text;
    return res.json({ reply });
  } catch (err) {
    console.error("Chatbot controller error:", err.message);
    if (err.cause?.code === "ECONNREFUSED") {
      return res.status(502).json({
        error: "Openai server is not running.",
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
