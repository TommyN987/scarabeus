import express from "express";
import { createProject, getAllProjects } from "../controllers/projects.js";

const router = express.Router();

router.get('/', getAllProjects)
router.post('/', createProject);

export default router;
