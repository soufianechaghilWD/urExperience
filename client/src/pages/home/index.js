import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { userContext } from "../../contexts/userContext";
import API from "../../api";

export default function Index() {

    const { user, loading, setUser } = useContext(userContext);
    const Navigate = useNavigate();
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        if(!loading && !user){
            Navigate('/login');
            return;
        } 

        // get the feed data

        async function getData () {
            const ids = user?.followers;
            const token = localStorage.getItem('experienceToken');
                try {
                const res = await API.post('/experiences/all', {ids, token});
                const resUser = await API.post('/users/data', {ids, token}); 
                const usersObj = {};
                resUser.data.forEach(element => {
                    usersObj[element?._id] = element;
                });
                for(let i = 0; i <res.data.experiences.length; i++) {
                    const crtExperience = res.data.experiences[i];
                    res.data.experiences[i].author = usersObj[`${crtExperience.author}`];
                }
                setExperiences(res.data.experiences);
            } catch(e) {
                console.log('err: ', e);
            }
        }
        
        getData();

    }, [loading, user])


    const logout = () => {
        setUser(null);
        localStorage.removeItem('experienceToken');
    }

    return <div>
            <Header showButton={true} />

            {/* <button onClick={logout}>Logout</button> */}
            <h1>Experiences</h1>
            <div>
                {
                    experiences?.map((experience, idx) => {
                        return <div key={idx}>
                            
                        </div>
                    })
                }
            </div>
            
        </div>
}