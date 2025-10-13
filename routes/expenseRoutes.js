import express from "express";
import { extractExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/extract", extractExpense);

export default router;