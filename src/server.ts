import express from "express";
import cors from "cors"; // ✅ Import CORS
import { config } from "dotenv";
import { limiter } from "./middlewares/rateLimit";
import { router } from "./routes/routes";

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT ?? 3001;

// ✅ Enable CORS for all origins
app.use(
  cors({
    origin: "*", // Allows requests from any origin (You can specify a domain instead of *)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// ✅ Middleware
app.use(express.json()); // Parse JSON requests
app.use(limiter); // Apply rate limiter

// ✅ Routes
app.use("/", router);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
