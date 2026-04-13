// import Transaction from "../models/Transaction.js";

// // Helper: get date filter based on range
// const getDateFilter = (dateRange) => {
//   const now = new Date();
//   switch (dateRange) {
//     case "last_week":
//       return new Date(now.setDate(now.getDate() - 7));
//     case "last_month":
//       return new Date(now.setDate(now.getDate() - 30));
//     case "last_3_months":
//       return new Date(now.setMonth(now.getMonth() - 3));
//     case "lifetime":
//     default:
//       return null;
//   }
// };

// // Helper: build a readable summary of transactions for the AI prompt
// const buildFinanceSummary = (transactions) => {
//   if (!transactions.length) return "The user has no transactions in this period.";

//   const totalIncome = transactions
//     .filter((t) => t.type === "INCOME")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const totalExpense = transactions
//     .filter((t) => t.type === "EXPENSE")
//     .reduce((sum, t) => sum + t.amount, 0);

//   // Category-wise expense breakdown
//   const categoryMap = {};
//   transactions
//     .filter((t) => t.type === "EXPENSE")
//     .forEach((t) => {
//       categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
//     });

//   const categoryBreakdown = Object.entries(categoryMap)
//     .map(([cat, amt]) => `${cat}: ₹${amt}`)
//     .join(", ");

//   // Day-wise expense (find highest spending day)
//   const dayMap = {};
//   transactions
//     .filter((t) => t.type === "EXPENSE")
//     .forEach((t) => {
//       const day = new Date(t.date).toISOString().split("T")[0];
//       dayMap[day] = (dayMap[day] || 0) + t.amount;
//     });

//   const highestDay = Object.entries(dayMap).sort((a, b) => b[1] - a[1])[0];

//   // Recent transactions list (last 10)
//   const recentList = transactions
//     .slice(-10)
//     .map(
//       (t) =>
//         `- [${new Date(t.date).toDateString()}] ${t.type} ₹${t.amount} | Category: ${t.category}${t.text ? ` | Note: ${t.text}` : ""}`
//     )
//     .join("\n");

//   return `
// FINANCIAL SUMMARY:
// - Total Income: ₹${totalIncome}
// - Total Expense: ₹${totalExpense}
// - Net Balance: ₹${totalIncome - totalExpense}
// - Total Transactions: ${transactions.length}

// CATEGORY-WISE EXPENSE BREAKDOWN:
// ${categoryBreakdown || "No expenses"}

// HIGHEST SPENDING DAY:
// ${highestDay ? `${highestDay[0]} with ₹${highestDay[1]}` : "No expense data"}

// RECENT TRANSACTIONS (last 10):
// ${recentList}
//   `.trim();
// };

// export const chatMessage = async (req, res) => {
//   try {
//     const { message, dateRange = "last_week" } = req.body;
//     const userId = req.user._id || req.user.id;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // 1. Fetch user transactions from DB
//     const dateFilter = getDateFilter(dateRange);
//     const query = { user: userId };
//     if (dateFilter) query.date = { $gte: dateFilter };

//     const transactions = await Transaction.find(query).sort({ date: 1 });

//     // 2. Build finance summary for the prompt
//     const financeSummary = buildFinanceSummary(transactions);

//     const systemPrompt = `
// You are FinSmart AI, a personal finance assistant. 
// Answer the user's questions based ONLY on the financial data provided below.
// Be concise, friendly, and specific. Use ₹ (Indian Rupees) for all amounts.
// If the data doesn't contain enough info to answer, say so honestly.

// ${financeSummary}
//     `.trim();

//     // 3. Call Ollama local API
//     const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         model: "gemma3:1b",       // Change this to your model: mistral, gemma2, etc.
//         stream: false,
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: message },
//         ],
//       }),
//     });

//     if (!ollamaResponse.ok) {
//       const errText = await ollamaResponse.text();
//       console.error("Ollama error:", errText);
//       return res.status(502).json({
//         error: "AI service unavailable. Make sure Ollama is running with: ollama serve",
//       });
//     }

//     const ollamaData = await ollamaResponse.json();
//     const reply = ollamaData?.message?.content || "Sorry, I couldn't generate a response.";

//     return res.json({ reply });

//   } catch (err) {
//     console.error("Chatbot controller error:", err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };




import Transaction from "../models/Transaction.js";

// Helper: get date filter based on range
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

// Helper: build readable finance summary to inject into AI prompt
const buildFinanceSummary = (transactions) => {
  if (!transactions.length)
    return "The user has no transactions in this time period.";

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  // Category-wise expense breakdown
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

  // Day-wise spending — find highest spending day
  const dayMap = {};
  transactions
    .filter((t) => t.type === "EXPENSE")
    .forEach((t) => {
      const day = new Date(t.date).toISOString().split("T")[0];
      dayMap[day] = (dayMap[day] || 0) + t.amount;
    });

  const sortedDays = Object.entries(dayMap).sort((a, b) => b[1] - a[1]);
  const highestDay = sortedDays[0];

  // All transactions list
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

    // 1. Fetch transactions from MongoDB
    const dateFilter = getDateFilter(dateRange);
    const query = { user: userId };
    if (dateFilter) query.date = { $gte: dateFilter };

    const transactions = await Transaction.find(query).sort({ date: 1 });

    // 2. Build finance context summary
    const financeSummary = buildFinanceSummary(transactions);

    const systemPrompt = `
You are FinSmart AI, a smart and friendly personal finance assistant.
Your job is to answer the user's finance questions based ONLY on the data provided below.
Be concise, accurate, and helpful. Always use ₹ (Indian Rupees) for amounts.
Do not make up data. If the data is insufficient to answer, say so clearly.

Here is the user's financial data:
${financeSummary}
    `.trim();

    console.log("=== CHATBOT HIT ===");

console.log("User ID:", userId);
console.log("Message:", message);
console.log("Date Range:", dateRange);
console.log("Transactions found:", transactions.length);

console.log("Calling Ollama...");

    // 3. Call Ollama
    const ollamaRes = await fetch("http://127.0.0.1:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma3:1b",
        stream: false,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user",   content: message },
        ],
      }),
    });

    console.log("Ollama response received");

    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text();
      console.error("Ollama error:", errText);
      return res.status(502).json({
        error:
          "AI service unavailable. Make sure Ollama is running: ollama serve",
      });
    }

    const ollamaData = await ollamaRes.json();
    const reply =
      ollamaData?.message?.content ||
      "Sorry, I could not generate a response. Please try again.";

    return res.json({ reply });

  } catch (err) {
    console.error("Chatbot controller error:", err.message);

    // Specific error if Ollama is not running
    if (err.cause?.code === "ECONNREFUSED") {
      return res.status(502).json({
        error: "Ollama is not running. Start it with: ollama serve",
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};