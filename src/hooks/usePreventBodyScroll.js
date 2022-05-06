import { useCallback, useEffect, useMemo, useState } from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

export const usePreventBodyScroll = () => {
    const [hover, setHover] = useState(false);
    const disableScroll = useCallback(() => setHover(true), []);
    const enableScroll = useCallback(() => setHover(false), []);
    const option = useMemo(() => ({reserveScrollBarGap: true}), []);

    useEffect(() => {
        hover ? disableBodyScroll(document.body, option) : enableBodyScroll(document.body, option);

        return () => clearAllBodyScrollLocks();

    }, [hover, option]);

    return {disableScroll, enableScroll};
};