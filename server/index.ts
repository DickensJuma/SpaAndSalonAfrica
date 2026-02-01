import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./db/connection";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { handleEventRegistration, handlePaymentVerification } from "./routes/events";

export async function createServer() {
  const app = express();

  // Connect to database
  try {
    await connectDatabase();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    // Continue anyway - some features may not work without DB
  }

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Contact form endpoint
  app.post("/api/contact", handleContact);

  // Event registration endpoints
  app.post("/api/events/register", handleEventRegistration);
  app.post("/api/events/verify-payment", handlePaymentVerification);

  return app;
}
