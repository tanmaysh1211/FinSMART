import express from "express";
import passport from "passport";
import { login } from "../controllers/auth.controller.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { register } from "../controllers/auth.controller.js";
import { resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();
/**
 * Email / Normal login (JWT)
 */
router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

/**
 * Google OAuth Login
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * Google OAuth Callback
 */
router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  (req, res) => {
     const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
     );
     console.log("REQ.USER:", req.user);
    // Token sent to frontend
    // res.redirect(
    //   `${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`
    // );

    // Redirect back to frontend
    res.redirect(
      `${process.env.CLIENT_URL}/login?token=${token}`
    );

    // res.redirect(`/login?token=${token}`);
  }
);


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
