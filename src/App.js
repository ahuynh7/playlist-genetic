import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import { createSelector } from '@reduxjs/toolkit';

import {
    useAuthorization,
    useRequestAuthorization
} from './hooks/useAuthorization';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Main from './components/Main';

export const AuthorizationContext = createContext();
export const selectAuthorization = createSelector(state => state.authorization, i => i);
export const selectPlaylist = createSelector(state => state.playlist, i => i);
export const selectUser = createSelector(state => state.user, i => i);

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
