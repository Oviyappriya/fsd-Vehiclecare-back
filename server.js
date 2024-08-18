import express from 'express';
import registerRouter from './routes/register.js';
import cors from 'cors';
import loginRouter from './routes/login.js';
import serviceRouter from './routes/services.js';
import connectViaMongoose from './db-utils/mongoose-connection.js';
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
app.use("/services", serviceRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));