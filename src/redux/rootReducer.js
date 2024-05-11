import authorizationReducer from "./slices/authorizationSlice";
import userReducer from "./slices/userSlice";
import topReducer from "./slices/topSlice.js";
import playlistReducer from "./slices/playlistSlice";
import { combineReducers } from "redux";

 //selector state slices which hold its respective data
const rootReducer = combineReducers({
    authorization: authorizationReducer,
    user: userReducer,
    top: topReducer,
    playlist: playlistReducer
});

export default rootReducer;