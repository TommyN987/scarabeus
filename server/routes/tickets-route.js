import express from "express";
import { createTicket } from "../controllers/tickets.js";

const router = express.Router();

router.patch('/', createTicket)

export default router;