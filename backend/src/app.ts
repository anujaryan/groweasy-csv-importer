import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);

export default app;