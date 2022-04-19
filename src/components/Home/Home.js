import { useEffect } from "react";
import { Button } from "react-bootstrap";

const Home = () => {
    const requestAuth = () => {
        const AUTHORIZE = 'https://accounts.spotify.com/authorize';
        console.log(process.env.REACT_APP_REDIRECT_URI);
    };

    useEffect(() => {
        requestAuth();
    }, []);

    return (
        <>
            <h1>home</h1>
            <Button size='sm'>
                log in
            </Button>
        </>
    );
};

export default Home;