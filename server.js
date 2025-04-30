import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from 'express';
import authRouter from './routers/auth.js'
import mongoose from 'mongoose';
import cors from 'cors'
import propertyRouter from './routers/property.js'
const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://real-state-tamayoz.netlify.app"
];

app.use(cors({
  origin: "https://real-state-tamayoz.netlify.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/api/auth", authRouter)
app.use("/api/properties", propertyRouter)

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;  
db.on("error", (error) => console.error(error.name));
db.once("open", () => console.log("connected to mongoose"));

app.listen(process.env.PORT || 5000);
