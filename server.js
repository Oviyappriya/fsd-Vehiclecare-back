import express from 'express';
import registerRouter from './routes/register.js';

import loginRouter from './routes/login.js';
import connectViaMongoose from './db-utils/mongoose-connection.js';
const app = express();
app.use(express.json());


// Connect to MongoDB
await connectViaMongoose();

// Use routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));