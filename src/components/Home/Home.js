import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import Login from "../Login/Login";

const Home = () => {
    const {isAuthorized, isPendingAuthorization} = useContext(AuthorizationContext);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    
    //prevents accessing /main route without proper authorization first
    useEffect(() => {
        if (pathname === '/main' && !isPendingAuthorization && !isAuthorized) {
            navigate('/');
        }
        
    }, [isAuthorized, isPendingAuthorization, navigate, pathname]);

    return (
        <>
            <h1>Normify</h1>
            {!isAuthorized && !isPendingAuthorization &&
            <Login />
            }
            <Container>
                <Outlet />
            </Container>
            
        </>
    );
};

export default Home;