import { useContext, useEffect, useState } from "react";

import { useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";
import { graphTypeEnum, MainContext } from "../Main/Main";
import { ItemsLabel, ListGroup, ListGroupItem } from "./TopItemPicker.styles";

const timeRangeTrans = {
    "shortTerm": "4 Weeks",
    "mediumTerm": "6 Months",
    "longTerm": "All Time"
};

const TopItemPicker = () => {
    const {feature, graphType, map, mapTrackList, setFeature} = useContext(MainContext);
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const [topItem, setTopItem] = useState({});

    const handleTopItemClick = itemList => () => {
        graphType.current = graphTypeEnum.topItems;

        setTopItem(itemList);
        setFeature("popularity");       //top artists do not contain any other data besides a popularity index
    };

    //useEffect here handles topItem changes
    useEffect(() => {
        if (graphType.current === graphTypeEnum.topItems) mapTrackList(topItem);

    }, [feature, graphType, mapTrackList, topItem]);

    //resets topItems if user selects a playlist
    useEffect(() => {
        if (graphType.current === graphTypeEnum.playlists) setTopItem({});
        
    }, [graphType, map]);

    return (
        <>
            <ItemsLabel>Top Tracks</ItemsLabel>
            <ListGroup horizontal>
                {Object.keys(topTracks).map((term, i) => 
                    <ListGroupItem key={i} action
                        onClick={handleTopItemClick(topTracks[term])}
                    >
                        {timeRangeTrans[term]}
                    </ListGroupItem>
                )}
            </ListGroup>
            <ItemsLabel>Top Artists</ItemsLabel>
            <ListGroup horizontal>
                {Object.keys(topArtists).map((term, i) => 
                    <ListGroupItem key={i} action
                        onClick={handleTopItemClick(topArtists[term])}
                    >
                        {timeRangeTrans[term]}
                    </ListGroupItem>
                )}
            </ListGroup>
        </>
    );
};

export default TopItemPicker;