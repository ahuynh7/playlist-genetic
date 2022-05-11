import authorizationReducer from "./slices/authorizationSlice";
import userReducer from "./slices/userSlice";
import topReducer from "./slices/topSlice.js";
import playlistReducer from "./slices/playlistSlice";

//common urls used in various slices
export const ME = "https://api.spotify.com/v1/me";
export const SPOTIFY = "https://api.spotify.com/v1";
export const TOKEN = "https://accounts.spotify.com/api/token";

 //selector state slices which hold its respective data
const rootReducer = {
    authorization: authorizationReducer,
    user: userReducer,
    top: topReducer,
    playlist: playlistReducer
};

export default rootReducer;