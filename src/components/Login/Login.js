import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { useAccessTokenFetch, useRequestAuthorization } from '../../hooks/useAuthorization';

const Login = () => {
    const {requestAuthorization} = useRequestAuthorization();
    const {accessTokenFetch} = useAccessTokenFetch();
    const {search} = useLocation();
    const initital = useRef(false);
    
    useEffect(() => {
        let code = new URLSearchParams(search).get('code');
        let error = new URLSearchParams(search).get('error');

        if (code && !error && !initital.current) {
            initital.current = true;
            accessTokenFetch(code);
        }
        else {
            //send back to home page
        }
        
    }, [accessTokenFetch, search]);
    
    return (
        <Button variant='primary' size='sm' onClick={requestAuthorization}>
            log in
        </Button>
    );
};

export default Login;