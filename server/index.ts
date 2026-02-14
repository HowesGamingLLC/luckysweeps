import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import * as authRoutes from "./routes/auth";
import * as gameRoutes from "./routes/games";
import * as transactionRoutes from "./routes/transactions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ========== AUTH ROUTES ==========
  app.post("/api/auth/register", authRoutes.handleRegister);
  app.post("/api/auth/login", authRoutes.handleLogin);
  app.post("/api/auth/verify-email", authRoutes.handleVerifyEmail);
  app.post("/api/auth/logout", authRoutes.handleLogout);
  app.get("/api/auth/user", authRoutes.getUser);
  app.put("/api/auth/user/balance", authRoutes.updateUserBalance);
  app.get("/api/admin/users", authRoutes.getAllUsers);

  // ========== GAME ROUTES ==========
  app.post("/api/games/wheel", gameRoutes.playSpinWheel);
  app.post("/api/games/lottery", gameRoutes.playLottery);
  app.post("/api/games/scratch", gameRoutes.playScratchCard);
  app.get("/api/games/history", gameRoutes.getGameHistory);
  app.get("/api/games/leaderboard", gameRoutes.getLeaderboard);
  app.get("/api/games/stats", gameRoutes.getDailyStats);

  // ========== TRANSACTION ROUTES ==========
  app.post("/api/transactions", transactionRoutes.createTransaction);
  app.get("/api/transactions", transactionRoutes.getTransactions);
  app.get("/api/transactions/:id", transactionRoutes.getTransaction);
  app.put("/api/transactions/:id/status", transactionRoutes.updateTransactionStatus);
  app.post("/api/payments/initialize", transactionRoutes.initializePayment);
  app.post("/api/payments/confirm", transactionRoutes.confirmPayment);
  app.post("/api/withdrawals/request", transactionRoutes.requestWithdrawal);
  app.get("/api/payments/methods", transactionRoutes.getDepositMethods);
  app.get("/api/withdrawals/methods", transactionRoutes.getWithdrawalMethods);

  return app;
}
