import { Project } from "../types/types"

export const fetchAllProjects = async () => {
  const res = await fetch('http://localhost:5000/dashboard/projects');
  const projects: Project[] = await res.json();
  return projects;
}

export const fetchOneProject = async (title: string) => {
  const res = await fetch(`http://localhost:5000/dashboard/projects/${title}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const project = await res.json();
  return project;
}

export const createProject = async (project: Project) => {
  await fetch('http://localhost:5000/dashboard/projects/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });
};

export const updateProjectPersonnel = async (title: string, user: string) => {
  await fetch('http://localhost:5000/dashboard/projects/remove', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title, user: user})
  });
};

export const addTicket = async (project: string, title: string, description: string, priority: string, submitter: string) => {
  await fetch('http://localhost:5000/dashboard/tickets', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: project,
      ticket: {
        title: title,
        description: description,
        priority: priority,
        submitter: submitter
      }
    })
  });
};

export const deleteProject = async (title: string) => {
  await fetch('http://localhost:5000/dashboard/projects', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title })
  })
}