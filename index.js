import "./loadEnv.js";
import express from "express";
import { conn } from "./db/conn.js";conn();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json()); // for receiving data in req.body
app.use(express.urlencoded({ extended: true })); // allows data in url string

app.get("/", (req, res) => {
    res.send('Backend running...');
})


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
