import { useCallback, useEffect, useState } from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

export const usePreventBodyScroll = () => {
    const [hover, setHover] = useState(false);
    const disableScroll = useCallback(() => setHover(true), []);
    const enableScroll = useCallback(() => setHover(false), []);

    useEffect(() => {
        hover ? disableBodyScroll(document.body) : enableBodyScroll(document.body);

        return () => clearAllBodyScrollLocks();

    }, [hover]);

    return {disableScroll, enableScroll};
};