import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb-connection.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import pinRoutes from "./routes/pinRoutes.js";
import path from "path";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json()); // JSON payloads
app.use(express.urlencoded({ extended: true })); // URL-encoded payloads
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

// Database Connection
connectDB();

const PORT = process.env.PORT;

// Routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/client/dist")))

// const clientBuildPath = path.resolve('C:/Users/DELL/Desktop/e-commerce/client/dist');
// console.log('Serving static files from:', clientBuildPath);

// app.use(express.static(clientBuildPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(clientBuildPath, 'index.html'));
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

