import express from "express";
import { chatMessage } from "../controllers/chatbot.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/message", authMiddleware, chatMessage);

export default router;
