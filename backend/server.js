import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import incomeRouter from './routes/incomeRoute.js';
import expenseRouter from './routes/expenseRoute.js';
import supportRouter from './routes/supportRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';


const app = express();
const port = 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

// ROUTES

app.use("/api/user", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/support", supportRouter);

app.get('/', (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});