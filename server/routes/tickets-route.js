import express from "express";
import { createTicket, updateTicket } from "../controllers/tickets.js";

const router = express.Router();

router.patch('/', createTicket);
router.patch('/update', updateTicket);

export default router;