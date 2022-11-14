import { createContext, useState } from "react";

export const userContext = createContext({});

const UserProvider = (props) => {
    
    const [user, setUser] = useState(null);


    const { children } = props;

    return <userContext.Provider value={{user}}>
        {children}
    </userContext.Provider>

} 

export default UserProvider