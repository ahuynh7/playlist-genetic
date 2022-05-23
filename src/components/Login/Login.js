import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { useAccessTokenFetch } from "../../hooks/useAuthorization";
import { LoginButton, LoginWrapper } from "./Login.styles";

const Login = () => {
    const {requestAuthorization} = useContext(AuthorizationContext);
    const {accessTokenFetch} = useAccessTokenFetch();
    const navigate = useNavigate();
    const {search} = useLocation();
    const initital = useRef(false);
    
    useEffect(() => {
        let code = new URLSearchParams(search).get("code");
        let error = new URLSearchParams(search).get("error");
        
        if (code && !error && !initital.current) {
            initital.current = true;

            accessTokenFetch(code);
            navigate("/main");
        }
        else {
            //send back to home page
        }
        
    }, [accessTokenFetch, navigate, search]);
    
    return (
        <LoginWrapper>
            {!initital.current &&
            <LoginButton
                variant="dark"
                size="lg"
                onClick={requestAuthorization}
            >
                Login with Spotify
            </LoginButton>}
        </LoginWrapper>
    );
};

export default Login;