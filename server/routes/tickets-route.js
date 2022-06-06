import express from "express";
import { createTicket, updateTicket, addComment } from "../controllers/tickets.js";

const router = express.Router();

router.patch('/', createTicket);
router.patch('/update', updateTicket);
router.patch('/comment', addComment);

export default router;