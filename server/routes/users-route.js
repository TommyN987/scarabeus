import express from 'express';
import { deleteUser, getUsers, updateUserRole } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/', updateUserRole);
router.delete('/', deleteUser);

export default router;