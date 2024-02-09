import "./loadEnv.js";
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import { conn } from "./db/conn.js";conn();
import userRouter from './routes/users.js';
import exerciseRouter from './routes/exercises.js';


const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json()); // for receiving data in req.body
app.use(express.urlencoded({ extended: true })); // allows data in url string

// Routes
app.use("/api/users", userRouter);
app.use("/api/exercises", exerciseRouter);


// Main page
app.get("/", (req, res) => {
    res.send('Backend running...');
})


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
