import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRequestAuthorization } from "../../hooks/useAuthorization";
import Login from "../Login/Login";

const Home = () => {
    const {isAuthorized, isPendingAuthorization} = useRequestAuthorization();
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
            {!isAuthorized && !isPendingAuthorization &&     //minor visual bug here
            <Login />
            }
            <Container>
                <Outlet />
            </Container>
            
        </>
    );
};

export default Home;