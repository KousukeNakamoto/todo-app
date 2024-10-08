import express from "express";
import { authenticateJWT } from "../middlewares/auth";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "test" });
});
router.get("/protected", authenticateJWT, (req, res) => {
  console.log(req.user);
  res.json({ message: "This is a protected route!" });
});

export default router;
