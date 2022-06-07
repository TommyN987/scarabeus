import express from "express";
import { createTicket, updateTicket, addComment, deleteComment } from "../controllers/tickets.js";

const router = express.Router();

router.patch('/', createTicket);
router.patch('/update', updateTicket);
router.patch('/comment', addComment);
router.patch('/delete', deleteComment);

export default router;