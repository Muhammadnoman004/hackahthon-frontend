import { useContext, useEffect } from "react"
import User from "../Context/Context"
import api from "../api/api";

const useFetchProfile = () => {
    const { user, setUser } = useContext(User);


    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await api.get('/api/users/profile');
                localStorage.setItem('userID', res.data._id);
                setUser(res.data)
                console.log(user);

            } catch (error) {
                console.log(error);
            }
        }
    })
}

export default useFetchProfile;