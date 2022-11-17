import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../contexts/userContext";

export default function Index() {

    const { user, loading } = useContext(userContext);
    const Navigate = useNavigate();

    useEffect(() => {
        if(!loading && !user) Navigate('/login');
    }, [loading])

    return <div>
        <h1>Home</h1>
        </div>
}