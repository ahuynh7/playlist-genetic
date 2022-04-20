import { Outlet } from "react-router-dom";
import { useAuthorization, useRequestAuthorization } from "../../hooks/useAuthorization";
import Login from "../Login/Login";

const Home = () => {
    const {isAuthorized} = useRequestAuthorization();
    const accessToken = useAuthorization();
    
    return (
        <>
            <h1>Normify</h1>
            {isAuthorized() ?
            null
            :
            <Login />
            }
            <Outlet />
        </>
    );
};

export default Home;