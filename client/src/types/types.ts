export type AuthContextProviderProps = {
  children: React.ReactNode
}

export type ProtectedRouteProps = {
  children: React.ReactNode
}

export type AuthContextType = {
  activeUser: User | null,
  setActiveUser: React.Dispatch<React.SetStateAction<User | null>>,
}

export type User = {
  email: string,
  password: string,
  name: string,
  role: 'Admin' | 'Project Manager' | 'Developer' | 'Submitter',
  projects: string[]
}

export type UserDB = {
  email: string,
  password: string,
  name: string,
  role: 'Admin' | 'Project Manager' | 'Developer' | 'Submitter',
  projects: string[],
  _id: string,
  __v: number
}

export type Project = {
  title: string,
  description: string,
  personnel: string[],
  tickets: {}[]
}