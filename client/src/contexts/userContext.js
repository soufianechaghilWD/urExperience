import { createContext, useEffect, useState } from "react";
import API from "../api";

export const userContext = createContext({});

const UserProvider = (props) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserAndSet = async () => {
        setLoading(true);
        const token = localStorage.getItem('experienceToken');

        if(!token) {
            setLoading(false);
            return
        }

        try{
            const res = await API.get('/users/', {headers: {"x-access-token": token}});
            setUser(res.data);
        } catch(e) {
            console.log('err: ', e);
        } finally {
            setLoading(false);
        }
    }

    const assignNewProToUser = (newPros) => {
        const newUser = Object.assign({}, user);
        Object.keys(newPros).forEach(proKey => {
            newUser[proKey] = newPros[proKey];
        });
        setUser(newUser);
    }
    
    useEffect(() => {
        // get the user from the server and set it to context if it exists
        getUserAndSet();
    }, [])

    const { children } = props;

    return <userContext.Provider value={{user, getUserAndSet, loading, assignNewProToUser, setUser}}>
        {children}
    </userContext.Provider>

} 

export default UserProvider