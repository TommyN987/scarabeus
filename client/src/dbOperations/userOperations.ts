import { User, UserDB } from "../types/types";

export const fetchAllUsers = async () => {
  const res = await fetch('http://localhost:5000/dashboard/users');
  const users: UserDB[] = await res.json();
  return users;
};

export const fetchOneUser = async (email: string) => {
  const res = await fetch(`http://localhost:5000/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const user = await res.json();
  return user;
};

export const createUser = async (user: User) => {
  await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
};

export const updateUserRole = async (name: string, role: string) => {
  await fetch('http://localhost:5000/dashboard/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, role: role})
  });
};

export const updateUserProjects = async (name: string, project: string) => {
  await fetch(`http://localhost:5000/dashboard/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name, projects: project})
  });
};

export const deleteUser = async (email: string) => {
  await fetch('http://localhost:5000/dashboard/users/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  });
}