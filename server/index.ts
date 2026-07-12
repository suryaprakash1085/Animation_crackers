import "dotenv/config";
import express from "express";
import cors from "cors";
import apiRoutes from "./routes";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // MVC API routes: /api/auth, /api/products, /api/categories,
  // /api/services, /api/orders, /api/users, /api/company,
  // /api/dashboard, /api/reports
  app.use("/api", apiRoutes);

  return app;
}
