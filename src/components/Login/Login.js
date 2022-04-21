import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { useAccessTokenFetch, useRequestAuthorization } from '../../hooks/useAuthorization';

const Login = () => {
    const {requestAuthorization} = useRequestAuthorization();
    const {accessTokenFetch} = useAccessTokenFetch();
    const navigate = useNavigate();
    const {search} = useLocation();
    const initital = useRef(false);
    
    useEffect(() => {
        let code = new URLSearchParams(search).get('code');
        let error = new URLSearchParams(search).get('error');

        if (code && !error && !initital.current) {
            initital.current = true;
            accessTokenFetch(code);
            navigate('/main');
        }
        else {
            //send back to home page
        }
        
    }, [accessTokenFetch, navigate, search]);
    
    return (
        <Button variant='primary' size='sm' onClick={requestAuthorization}>
            log in
        </Button>
    );
};

export default Login;