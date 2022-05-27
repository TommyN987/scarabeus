import express from "express";
import { getRegisterPage } from "../controllers/register.js";

const router = express.Router();

router.get('/', getRegisterPage);

export default router;