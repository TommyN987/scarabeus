import express from "express";
import { createTicket } from "../controllers/tickets.js";

const router = express.Router();

router.post('/', createTicket)

export default router;