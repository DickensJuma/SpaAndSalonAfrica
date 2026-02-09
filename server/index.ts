import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./db/connection";
import { ContactController } from "./controllers/contact.controller";
import { EventsController } from "./controllers/events.controller";
import { ServicesController } from "./controllers/services.controller";
import { WebinarController } from "./controllers/webinar.controller";
import { BusinessClubController } from "./controllers/business-club.controller";

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

  // Contact form endpoint
  app.post("/api/contact", ContactController.submitContact);

  // Event registration endpoints
  app.post("/api/events/register", EventsController.register);
  app.post("/api/events/verify-payment", EventsController.verifyPayment);

  // Service inquiry endpoint
  app.post("/api/services/inquiry", ServicesController.submitInquiry);

  // Webinar registration endpoints
  app.post("/api/webinar/register", WebinarController.register);
  app.post("/api/webinar/verify-payment", WebinarController.verifyPayment);

  // Business club registration endpoint
  app.post("/api/business-club/register", BusinessClubController.register);

  return app;
}

// Start server on port 8081 if this file is run directly
if (require.main === module) {
  createServer().then(app => {
    app.listen(8081, () => {
      console.log("🚀 Backend server running on http://localhost:8081");
    });
  });
}
