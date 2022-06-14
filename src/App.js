import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";

import {
    useAuthorization,
    useRequestAuthorization
} from "./hooks/useAuthorization";

import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Main from "./components/Main";
import { useEffect } from "react";

export const AuthorizationContext = createContext();

const App = () => {
    const {
        isAuthorized, 
        isPendingAuthorization, 
        requestAuthorization
    } = useRequestAuthorization();
    const accessToken = useAuthorization();
    
    const contextPackage = {
        accessToken,
        isAuthorized, 
        isPendingAuthorization, 
        requestAuthorization
    };

    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <AuthorizationContext.Provider value={contextPackage}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path="login" element={null} />
                        <Route path="main" element={<Main />} />
                        <Route path="about" element={null} />
                        <Route path="contact" element={null} />
                        <Route path="donate" element={null} />
                        <Route path="faq" element={null} />
                        {/* more routes to be added when footer is completed */}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthorizationContext.Provider>    
    );
}

export default App;
