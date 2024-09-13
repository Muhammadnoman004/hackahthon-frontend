import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import User from "../Context/Context"
import api from "../api/api";
import loader from "../Context/LoaderContext";

const useFetchProfile = () => {
    const { user, setUser } = useContext(User);
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setloading(true);
                const res = await api.get("/api/users/profile");
                localStorage.setItem("userId", res.data._id);
                if (!res.data.isVerified) navigate("/account-verification")
                setUser(res.data);
                setloading(false);
            } catch (error) {
                setloading(false);
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login");
            }
        };

        if (!user) {
            fetchProfile();
        }
    }, [setUser]);

    return { user, setUser };
}

export default useFetchProfile;