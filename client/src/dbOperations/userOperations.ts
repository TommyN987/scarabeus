import { User, UserDB } from "../types/types";
import { path } from "./path";

export const fetchAllUsers = async () => {
  const res = await fetch(`${path}/dashboard/users`);
  const users: UserDB[] = await res.json();
  return users;
};

export const fetchOneUser = async (email: string) => {
  const res = await fetch(`${path}/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const user = await res.json();
  return user;
};

export const createUser = async (user: User) => {
  await fetch(`${path}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

export const updateUserRole = async (name: string, role: string) => {
  await fetch(`${path}/dashboard/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, role: role})
  });
};

export const updateUserProjects = async (name: string, project: string) => {
  await fetch(`${path}/dashboard/users/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, projects: project})
  });
};

export const handleProjectsEditInUser = async (usersToUpdate: string[], project: string) => {
  await fetch(`${path}/dashboard/users/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usersToUpdate: usersToUpdate,
      project: project
    })
  })
}

export const removeUserProjects = async (name: string, project: string) => {
  await fetch(`${path}/dashboard/users/remove`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, projects: project})
  });
};

export const deleteUser = async (email: string) => {
  await fetch(`${path}/dashboard/users/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  });
}