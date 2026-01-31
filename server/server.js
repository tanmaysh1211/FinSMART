// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/auth.routes.js";
// import transactionRoutes from "./routes/transaction.routes.js";
// import analyticsRoutes from "./routes/analytics.routes.js";
// import chatbotRoutes from "./routes/chatbot.routes.js";
// import errorMiddleware from "./middleware/error.middleware.js";
// import passport from "passport";

// import "./config/passport.js";
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(passport.initialize());
// app.use(errorMiddleware);
// app.use(cors());
// app.use(helmet());

// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/chatbot", chatbotRoutes);

// app.listen(3002, () => {
//   console.log("Backend running on port 3002");
// });







// import fs from "fs";
// console.log("PWD:", process.cwd());
// console.log("ENV FILE EXISTS:", fs.existsSync("./.env"));

// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import passport from "passport";
// // import dotenv from "dotenv";
// // import path from "path";
// // import { fileURLToPath } from "url";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // dotenv.config({ path: path.join(__dirname, ".env") });


// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const envPath = path.join(__dirname, ".env");

// console.log("Loading ENV from:", envPath);

// dotenv.config({ path: envPath });

// console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);

// import connectDB from "./config/db.js";
// import "./config/passport.js";

// import authRoutes from "./routes/auth.routes.js";
// import transactionRoutes from "./routes/transaction.routes.js";
// import analyticsRoutes from "./routes/analytics.routes.js";
// import chatbotRoutes from "./routes/chatbot.routes.js";
// import errorMiddleware from "./middleware/error.middleware.js";

// connectDB();

// const app = express();

// app.use(cors());
// app.use(helmet());
// app.use(express.json());
// app.use(passport.initialize());

// app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/chatbot", chatbotRoutes);

// app.use(errorMiddleware);

// app.listen(3002, () => {
//   console.log("Backend running on port 3002");
// });



import "./loadEnv.js";


import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import passport from "passport";

import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
// import chatbotRoutes from "./routes/ai.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

connectDB();

const app = express();

app.set("trust proxy", 1);

// app.use(cors());
app.use(
  cors({
    origin:true,
    credentials: true,
  })
);


app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
// const transactionRoutes = require("./routes/transaction.routes.js");
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
// app.use("/api/chatbot", chatbotRoutes);

app.use(errorMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React frontend
app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


// app.listen(3002, () => {
//   console.log("Backend running on port 3002");
// });

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
