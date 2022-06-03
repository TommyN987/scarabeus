import express from "express";
import { createProject, getAllProjects, getOneProject, deleteProject } from "../controllers/projects.js";

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:title', getOneProject); 
router.post('/', createProject);
router.delete('/', deleteProject)

export default router;
