import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import Navbars from "./Components/Navbars/Navbars";
import useFetchProfile from "./utils/useFetchProfile";

function App() {
  const { user } = useFetchProfile();
  const navigate = useNavigate();

  // Using useEffect to trigger navigation after the initial render
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate('/student/dashboard');
      } else if (user.role === "trainer") {
        navigate('/trainer/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [user, navigate]); // Re-run when `user` or `navigate` changes

  return (
    <>
      <Navbars title={"Student | Dashboard"}>
      </Navbars>
    </>
  );
}

export default App;

