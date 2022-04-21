import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../redux/slices/userSlice";
import { useAuthorization } from "./useAuthorization";

export const useUserFetch = () => {
    const accessToken = useAuthorization();
    const state = useSelector(state => state.user);
    const [user, setUser] = useState(state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) dispatch(getUser(accessToken));
    }, [accessToken, dispatch]);

    useEffect(() => setUser(state.user), [state.user]);

    return user;
};