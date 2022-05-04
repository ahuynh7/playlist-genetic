import { useContext, useEffect, useState } from "react";

import { useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";
import { graphTypeEnum, MainContext } from "../Main/Main";

const TopItemPicker = () => {
    const {feature, graphType, mapTrackList, setFeature} = useContext(MainContext);
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const [topItem, setTopItem] = useState({});

    const handleTopItemClick = itemList => {
        graphType.current = graphTypeEnum.topItems;

        setTopItem(itemList);
        setFeature('popularity');       //top artists do not contain any other data besides a popularity index
    };

    //useEffect here handles topItem changes
    useEffect(() => {
        if (graphType.current === graphTypeEnum.topItems) mapTrackList(topItem);

    }, [feature, graphType, mapTrackList, topItem]);

    return (
        <>
            <p>top tracks</p>
            <li>
                {Object.keys(topTracks).map((term, i) => 
                    <ul key={i}
                        onClick={() => handleTopItemClick(topTracks[term])}
                    >
                        {term}
                    </ul>
                )}
            </li>
            <p>top artists</p>
            <li>
                {Object.keys(topArtists).map((term, i) => 
                    <ul key={i}
                        onClick={() => handleTopItemClick(topArtists[term])}
                    >
                        {term}
                    </ul>
                )}
            </li>
        </>
    );
};

export default TopItemPicker;