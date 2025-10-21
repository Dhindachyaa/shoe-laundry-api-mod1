import express from "express";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Base Route
app.get('/', (req, res) => {
    res.send('Welcome to the Shoe Laundry API. Access endpoints at /api/items');
});

// Item Routes
app.use("/api/items", itemRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});