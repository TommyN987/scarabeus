import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Profile from "../../components/profile/Profile"
import Projects from "../../components/projects/Projects"
import Sidebar from "../../components/sidebar/Sidebar"
import Tickets from "../../components/tickets/Tickets"
import Users from "../../components/users/Users"
import Charts from "../../components/charts/Charts"
import { AuthContext } from "../../contexts/AuthContext"
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const userContext = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/')
      }
    })
  })

  useEffect(() => {
    
    if (!userContext?.activeUser) {
      const userJSON: any = localStorage.getItem('activeScarabeus');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        userContext?.setActiveUser(user)
      }
    }
  }, [userContext])

  useEffect(() => {
    localStorage.setItem('activeScarabeus',JSON.stringify(userContext?.activeUser)) 
  })

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Charts />} />
        <Route path="users" element={<Users />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  )
}
export default Dashboard