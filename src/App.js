import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

import {
    useAuthorization,
    useRequestAuthorization
} from './hooks/useAuthorization';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Main from './components/Main';

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

    return (
        <AuthorizationContext.Provider value={contextPackage}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} >
                        <Route path='login' element={null} />
                        <Route path='main' element={<Main />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthorizationContext.Provider>    
    );
}

export default App;
