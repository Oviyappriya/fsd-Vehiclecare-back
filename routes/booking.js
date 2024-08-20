import express from "express";
import jwt from "jsonwebtoken";

import { Booking } from "../db-utils/models.js";

const bookingRouter = express.Router();

bookingRouter.post("/place-booking", async (req, res) => {
  const token = req.headers["authorization"];

  try {
   
    const { services, totalQty } = req.body;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const body = {
      userId: user.userId,
      products,
      totalQty,
      bookingId: id,
      bookingTotal: services.reduce((p, c) => p + c.qty * c.price, 0),
    };

    const booking = new Booking(body);

    await booking.save();
    res.json({ msg: `BookingNo: ${id} Placed Successfully`, bookingNo: id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export default bookingRouter;