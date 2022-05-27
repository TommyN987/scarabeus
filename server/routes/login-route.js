import express from 'express';
import { getLoggedIn } from '../controllers/login.js';

const router = express.Router();

router.get('/', getLoggedIn);

export default router;