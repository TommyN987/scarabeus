import { User, UserDB } from "./types/types";

export const fetchAllUsers = async () => {
  const allUsersInDb: User[] = [];
  const res = await fetch('http://localhost:5000/dashboard/users');
  const users: UserDB[] = await res.json();
  users.forEach((user: UserDB) => {
    const userToAdd: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      projects: user.projects
    };
    allUsersInDb.push(userToAdd);
  });
  return allUsersInDb;
};