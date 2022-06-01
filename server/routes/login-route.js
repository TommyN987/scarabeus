import express from 'express';
import { loginUser } from '../controllers/users.js';

const router = express.Router();

router.get('/:email', loginUser);

export default router;