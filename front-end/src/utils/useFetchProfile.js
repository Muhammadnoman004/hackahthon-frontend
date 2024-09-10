import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import User from "../Context/Context"
import api from "../api/api";
import loader from "../Context/LoaderContext";

const usefetchProfile = () => {
    const { user, setUser } = useContext(User);
    const [loading, setloading] = useContext(loader);
    const navigate = useNavigate();


    useEffect(() => {
        const getProfile = async () => {
            try {
                setloading(true);
                const res = await api.get('/api/users/profile');
                localStorage.setItem('userID', res.data._id);
                if (!res.data.isVerified) navigate('/account-verification');
                setUser(res.data);
                setloading(false);

            } catch (error) {
                setloading(false);
                localStorage.removeItem('token');
                setUser(null);
                navigate('/login');
            }

            if (!user) {
                getProfile()
            }
        }
    }, [setUser]);

    return { user, setUser };
}

export default usefetchProfile;