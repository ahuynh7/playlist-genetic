import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, requestAccessToken } from '../redux/slices/authorizationSlice';

export const useAuthorization = () => {
    const {refreshAccessTokenFetch} = useAccessTokenFetch();
    const state = useSelector(state => state.authorization);
    const [accessToken, setAccessToken] = useState(state.accessToken);
    const refreshToken = state.refreshToken;

    //only sets tokens if it exists; eliminates uneccesary calls
    useEffect(() => {
        if (state.accessToken) setAccessToken(state.accessToken);
    }, [state.accessToken]);
    
    //automagically handles refreshing tokens once it expires
    useEffect(() => {
        if (!accessToken || !refreshToken) return;
        
        const timer = setTimeout(async () => {
            console.log('zzz');
            refreshAccessTokenFetch(refreshToken);
        }, 3600 * 1000);        //lifetime of one hour, possibly need to make dynamic
        
        //clear timeout before each render
        return () => clearTimeout(timer);

    }, [accessToken, refreshAccessTokenFetch, refreshToken]);

    return accessToken;
};

export const useRequestAuthorization = () => {
    const state = useSelector(state => state.authorization);
    const queryString = require('query-string');
    const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
    const [isAuthorized, setIsAuthorized] = useState(state.isAuthorized);
    const [isPendingAuthorization, setIsPendingAuthorization] = useState(state.isPendingAuthorization);

    useEffect(() => {
        setIsAuthorized(state.isAuthorized);
    }, [state.isAuthorized]);

    useEffect(() => {
        setIsPendingAuthorization(state.isPendingAuthorization);
    }, [state.isPendingAuthorization]);

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
        let scope = [
            'user-read-private',
            'user-top-read',
            'user-library-read',
            'user-read-recently-played',
            'user-read-currently-playing',
            'user-follow-read',
            'playlist-read-private'
        ];
        let query = queryString.stringify({
            response_type: 'code',
            client_id: process.env.REACT_APP_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI + 'login',
            scope: scope.join(' '),
            state: generateRandomString(16),
            show_dialogue: true     //true: manual accept; for testing, false: automatic
        });
        
        //unlike a thunk, need to physically navigate to external url, but a GET call nevertheless
        url += query;
        window.location.href = url + query;
    };

    return {isAuthorized, isPendingAuthorization, requestAuthorization};
};

export const useAccessTokenFetch = () => {
    const dispatch = useDispatch();

    const accessTokenFetch = code => dispatch(requestAccessToken(code));
    const refreshAccessTokenFetch = refreshToken => dispatch(refreshAccessToken(refreshToken));
    
    return {accessTokenFetch, refreshAccessTokenFetch};
};