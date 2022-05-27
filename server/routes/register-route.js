import express from "express";
import { createUser, getRegisterPage } from "../controllers/register.js";

const router = express.Router();

router.get('/', getRegisterPage);
router.post('/', createUser)

export default router;