import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAccessTokenFetch, useRequestAuthorization } from '../../hooks/useAuthorization';

const Home = () => {
    const requestAuth = useRequestAuthorization();
    const accessTokenFetch = useAccessTokenFetch();
    const {search} = useLocation();
    
    useEffect(() => {
        let code = new URLSearchParams(search).get('code');
        let error = new URLSearchParams(search).get('error');

        if (code && !error) accessTokenFetch(code);
        else console.log(error);

    }, [accessTokenFetch, search]);
    
    return (
        <>
            <h1>home</h1>
            <Button size='sm' onClick={requestAuth}>
                log in
            </Button>
        </>
    );
};

export default Home;