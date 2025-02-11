import express from "express";
import cors from "cors"; // ✅ Import CORS
import { config } from "dotenv";
import { limiter } from "./middlewares/rateLimit";
import { router } from "./routes/routes";

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT ?? 3001;

// ✅ Enable CORS
app.use(
  cors({
    origin: "*", // Allows requests from any origin (Use a specific domain instead of "*" for security)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ Allows sending cookies and authentication headers if needed
  })
);

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(limiter); // Apply rate limiter

// ✅ Set CORS Headers Manually (For Extra Safety)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allows credentials
  next();
});

// ✅ Routes
app.use("/", router);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
