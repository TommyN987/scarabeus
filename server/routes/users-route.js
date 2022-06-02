import express from 'express';
import { deleteUser, getUsers, updateUserRole, updateUserProjects } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/', updateUserRole);
router.patch('/', updateUserProjects);
router.delete('/', deleteUser);

export default router;