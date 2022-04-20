import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, requestAccessToken, setExpired } from '../redux/slices/authorizationSlice';

export const useAuthorization = () => {
    const {refreshAccessTokenFetch} = useAccessTokenFetch();
    const state = useSelector(state => state.authorization);
    const [accessToken, setAccessToken] = useState(state.accessToken);
    const refreshToken = state.refreshToken;

    useEffect(() => {
        setAccessToken(state.accessToken);
    }, [state.accessToken]);

    //handles refreshing tokens once it expires automagically
    useEffect(() => {
        if (!accessToken) return;
        
        //todo: clear timeout if accessToken is intermediately changed
        setTimeout(() => {
            setExpired(true);
            refreshAccessTokenFetch(refreshToken);
        }, 3600000);        //lifetime of one hour, possibly need to make dynamic
        
    }, [accessToken]);

    return accessToken;
};

export const useRequestAuthorization = () => {
    const state = useSelector(state => state.authorization);
    const queryString = require('query-string');
    const AUTHORIZE = 'https://accounts.spotify.com/authorize?';

    const generateRandomString = length => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

    //gathers url to request authorization with spotify account
    const requestAuthorization = () => {
        let url = AUTHORIZE;
        let scope = 'user-read-private user-top-read user-read-recently-played user-read-currently-playing user-follow-read playlist-modify-public playlist-modify-private playlist-read-private';
        let query = queryString.stringify({
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI + 'login',
            scope: scope,
            state: generateRandomString(16),
            show_dialogue: false
        });
        
        //unlike a thunk, need to physically navigate to external url, but a GET call nevertheless
        url += query;
        window.location.href = url + query;
    };

    const isAuthorized = () => {
        return state.isAuthorized;
    };

    return {isAuthorized, requestAuthorization};
};

export const useAccessTokenFetch = () => {
    const dispatch = useDispatch();

    const accessTokenFetch = code => dispatch(requestAccessToken(code));
    const refreshAccessTokenFetch = refreshToken => dispatch(refreshAccessToken(refreshToken));
    
    return {accessTokenFetch, refreshAccessTokenFetch};
};