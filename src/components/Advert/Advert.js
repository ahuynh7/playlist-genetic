
import { useEffect } from "react";

import { AdvertWrapper } from "./Advert.styles";

//depreciated as of 6/28/22
const Advert = () => {
    //operates to initialize the ad when the component mounts
    useEffect(() => {
        const adInit = setTimeout(() => {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        }, 200);

        return () => clearTimeout(adInit);

    }, []);

    return (
        <AdvertWrapper>
            <ins className="adsbygoogle"
                style={{display: "block"}}
                data-adtest="on"
                data-ad-client="ca-pub-7643537625959883"
                data-ad-slot="9867139127"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </AdvertWrapper>
    );
};

export default Advert;