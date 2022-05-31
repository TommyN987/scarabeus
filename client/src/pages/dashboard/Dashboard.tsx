import { Routes, Route } from "react-router-dom"
import Profile from "../../components/profile/Profile"
import Projects from "../../components/projects/Projects"
import Sidebar from "../../components/sidebar/Sidebar"
import Tickets from "../../components/tickets/Tickets"
import Users from "../../components/users/Users"

const Dashboard = () => {

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  )
}
export default Dashboard