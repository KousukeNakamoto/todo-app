import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateJWT } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
});

export default router;
