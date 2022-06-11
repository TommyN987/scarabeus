import express from 'express';
import { deleteUser, getUsers, updateUserRole, addUserProjects, removeUserProjects, handleProjectsEdit } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/', updateUserRole);
router.patch('/', addUserProjects);
router.patch('/edit', handleProjectsEdit)
router.patch('/remove', removeUserProjects)
router.delete('/', deleteUser);

export default router;