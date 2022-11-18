import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

export default function Index() {

    const { user, loading, setUser } = useContext(userContext);
    const Navigate = useNavigate();

    useEffect(() => {
        if(!loading && !user) Navigate('/login');
    }, [loading, user])


    const logout = () => {
        setUser(null);
        localStorage.removeItem('experienceToken');
    }

    return <div>
        <h1>Home</h1>
        <button onClick={logout}>Logout</button>
        </div>
}