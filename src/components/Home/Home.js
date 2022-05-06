import { createContext, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { useUserFetch } from "../../hooks/useUser";
import Login from "../Login";
import Navbar from "../Navbar";

export const UserContext = createContext();

const Home = () => {
    const {isAuthorized, isPendingAuthorization} = useContext(AuthorizationContext);
    const user = useUserFetch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    //prevents accessing /main route without proper authorization first
    useEffect(() => {
        if (pathname === "/main" && !isPendingAuthorization && !isAuthorized) {
            navigate("/");
        }
        
    }, [isAuthorized, isPendingAuthorization, navigate, pathname]);

    return (
        <UserContext.Provider value={user}>
            <Navbar />
            {!isAuthorized && !isPendingAuthorization &&
            <Login />
            }
            <Outlet />
            {/* footer here */}
        </UserContext.Provider>
    );
};

export default Home;