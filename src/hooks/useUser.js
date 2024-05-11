import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../redux/store";

//token refreshes must also not deploy fetches furthermore, after initial fetch
//      vvvvv
export const useUserFetch = () => {
    const state = useSelector(selectUser);
    const [user, setUser] = useState(state);

    useEffect(() => {
        setUser(state);
    }, [state]);
    return user;
};