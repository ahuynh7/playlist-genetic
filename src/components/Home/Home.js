import { createContext, useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { useUserFetch } from "../../hooks/useUser";
import Footer from "../Footer";
import Login from "../Login";
import Navbar from "../Navbar";

export const UserContext = createContext();

const Home = () => {
    const {isAuthorized, isPendingAuthorization} = useContext(AuthorizationContext);
    const user = useUserFetch();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const acceptLogin = () => {
        if (pathname === "/about" || pathname === "/faq") return false;
        else return true;
    };

    //prevents accessing /main route without proper authorization first
    useEffect(() => {
        if (pathname === "/main" && !isPendingAuthorization && !isAuthorized)
            navigate("/");
        
    }, [isAuthorized, isPendingAuthorization, navigate, pathname]);

    //navigates to /main if already authorized
    useEffect(() => {
        if (pathname === "/" && !isPendingAuthorization && isAuthorized) {
            navigate("/main");
        }
    }, [isAuthorized, isPendingAuthorization, navigate, pathname]);
    return (
        <UserContext.Provider value={user}>
            <Navbar />
            {acceptLogin() && <Login />}
            <Outlet />
            <Footer />
        </UserContext.Provider>
    );
};

export default Home;