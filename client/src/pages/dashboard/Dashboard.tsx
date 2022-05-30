import { Routes, Route } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import Users from "../../components/users/Users"

const Dashboard = () => {

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="projects" />
        <Route path="tickets" />
        <Route path="profile" />
      </Routes>
    </>
  )
}
export default Dashboard