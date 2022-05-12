import authorizationReducer from "./slices/authorizationSlice";
import userReducer from "./slices/userSlice";
import topReducer from "./slices/topSlice.js";
import playlistReducer from "./slices/playlistSlice";

 //selector state slices which hold its respective data
const rootReducer = {
    authorization: authorizationReducer,
    user: userReducer,
    top: topReducer,
    playlist: playlistReducer
};

export default rootReducer;