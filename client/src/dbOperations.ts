import { UserDB } from "./types/types";

export const fetchAllUsers = async () => {
  const res = await fetch('http://localhost:5000/dashboard/users');
  const users: UserDB[] = await res.json();
  return users;
};

export const updateUserProjects = async (name: string, project: string) => {
  await fetch(`http://localhost:5000/dashboard/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, projects: project})
  })
}