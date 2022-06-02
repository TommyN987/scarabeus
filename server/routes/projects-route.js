import express from "express";
import { createProject, getAllProjects, getOneProject } from "../controllers/projects.js";

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:title', getOneProject); 
router.post('/', createProject);

export default router;
