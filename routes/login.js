import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../db-utils/models.js";

const router = Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }, { _id: 0 });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    res.status(200).json({ msg: "Login successful", userToken: authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;