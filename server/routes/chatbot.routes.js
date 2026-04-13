// import express from "express";
// import { chatMessage } from "../controllers/chatbot.controller.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // POST /api/chatbot/message
// router.post("/message", protect, chatMessage);

// export default router;




import express from "express";
import { chatMessage } from "../controllers/chatbot.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/chatbot/message
router.post("/message", authMiddleware, chatMessage);

export default router;