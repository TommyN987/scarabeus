import { Project } from "../types/types"

export const createProject = async (project: Project) => {
  await fetch('http://localhost:5000/dashboard/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });
};