import { useNavigate } from "react-router-dom"
import Navbars from "./Components/Navbars/Navbars"
import useFetchProfile from "./utils/useFetchProfile"

function App() {

  const { user } = useFetchProfile();
  const navigate = useNavigate();

  return (
    <>
      <Navbars title={"Student | Dashboard"}>
        {user?.role === "student" ? navigate('/student/dashboard') : user?.role === "trainer" ? navigate('/trainer/dashboard') : user?.role === 'admin' ? navigate('/admin/dashboard') : null}
      </Navbars>
    </>
  )
}

export default App
