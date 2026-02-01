import "./loadEnv.js";
import express from "express";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

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
    origin:process.env.CLIENT_URL,
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

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
