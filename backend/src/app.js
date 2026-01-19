import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
