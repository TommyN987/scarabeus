import { Project } from "../types/types";
import { path } from "./path";

export const fetchAllProjects = async () => {
  const res = await fetch(`${path}/dashboard/projects`);
  const projects: Project[] = await res.json();
  return projects;
}

export const fetchOneProject = async (title: string) => {
  const res = await fetch(`${path}/dashboard/projects/${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const project = await res.json();
  return project;
}

export const createProject = async (project: Project) => {
  await fetch(`${path}/dashboard/projects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });
};

export const editProject = async (prevTitle: string, newTitle: string, description: string, personnel: string[]) => {
  await fetch(`${path}/dashboard/projects/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prevTitle: prevTitle,
      newTitle: newTitle,
      description: description,
      personnel: personnel
    })
  })
}

export const updateProjectPersonnel = async (title: string, user: string) => {
  await fetch(`${path}/dashboard/projects/remove`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title, user: user})
  });
};

export const deleteProject = async (title: string) => {
  await fetch(`${path}/dashboard/projects`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title })
  })
}