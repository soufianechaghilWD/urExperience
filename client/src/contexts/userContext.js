import { createContext, useEffect, useState } from "react";
import API from "../api";

export const userContext = createContext({});

const UserProvider = (props) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // get the user from the server and set it to context if it exists
        setLoading(true);
        getUserAndSet();
        setLoading(false);
    })

    const getUserAndSet = () => {
        const token = localStorage.getItem('experienceToken');

        if(token) {
            API.get('/users/', {
                headers: {
                    "x-access-token": token
                }
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            })
        }

    }

    const { children } = props;

    return <userContext.Provider value={{user, getUserAndSet, loading}}>
        {children}
    </userContext.Provider>

} 

export default UserProvider