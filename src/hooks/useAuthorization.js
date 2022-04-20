import { useDispatch } from 'react-redux';
import { requestAccessToken } from '../redux/slices/authorizationSlice';

export const useRequestAuthorization = () => {
    const queryString = require('query-string')
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
    const requestAuth = () => {
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

        url += query;
        window.location.href = url + query;
    };

    return requestAuth;
};

export const useAccessTokenFetch = () => {
    const dispatch = useDispatch();

    const accessTokenFetch = code => dispatch(requestAccessToken(code));

    return accessTokenFetch;
};