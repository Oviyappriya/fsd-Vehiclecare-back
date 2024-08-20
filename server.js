import express from 'express';
import registerRouter from './routes/register.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import loginRouter from './routes/login.js';
import serviceRouter from './routes/services.js';
import connectViaMongoose from './db-utils/mongoose-connection.js';
import bookingRouter from './routes/booking.js';
const app = express();
app.use(express.json());
app.use(cors())
const logger = (req,res,next) =>{
    console.log(new Date().toString(),`Request type: ${req.method}, URL: ${req.url}`);
    next();
 
}

app.use(logger)

// Connect to MongoDB
await connectViaMongoose();

// Use routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
const tokenVerify = (req, res, next) => {
    const token = req.headers["authorization"];
  
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ msg: err.message });
    }
  };
app.use("/services", tokenVerify,serviceRouter);
app.use("/bookings", tokenVerify,bookingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));