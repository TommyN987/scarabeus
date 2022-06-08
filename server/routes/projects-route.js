import express from "express";
import { createProject, getAllProjects, getOneProject, deleteProject, editProject, removePersonnelFromProject } from "../controllers/projects.js";

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:title', getOneProject); 
router.post('/', createProject);
router.patch('/', editProject)
router.patch('/remove', removePersonnelFromProject)
router.delete('/', deleteProject);

export default router;
