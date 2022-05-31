import express from 'express';
import { getUsers, updateUserRole } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/', updateUserRole)

export default router;