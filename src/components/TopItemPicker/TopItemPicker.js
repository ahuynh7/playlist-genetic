import { useContext, useEffect, useState } from "react";

import { useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useTop";
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

    const handleTopItemClick = (itemList, type) => () => {
        //changes graph type according to which top item a user selected
        graphType.current = (type === graphTypeEnum.topTracks) ? 
            graphTypeEnum.topTracks 
            : 
            graphTypeEnum.topArtists;

        setTopItem(itemList);  
    };

    //useEffect here handles top track changes
    useEffect(() => {
        if (graphType.current === graphTypeEnum.topTracks) mapTrackList(topItem);

    }, [feature, graphType, mapTrackList, topItem]);

    //useEffect here handles top artist changes
    useEffect(() => {
        if (graphType.current === graphTypeEnum.topArtists) {
            setFeature("popularity");       //top artists do not contain any other data besides a popularity index
            mapTrackList(topItem);
        }

    }, [feature, graphType, mapTrackList, setFeature, topItem]);

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
                        onClick={handleTopItemClick(topTracks[term], graphTypeEnum.topTracks)}
                    >
                        {timeRangeTrans[term]}
                    </ListGroupItem>
                )}
            </ListGroup>
            <ItemsLabel>Top Artists</ItemsLabel>
            <ListGroup horizontal>
                {Object.keys(topArtists).map((term, i) => 
                    <ListGroupItem key={i} action
                        onClick={handleTopItemClick(topArtists[term], graphTypeEnum.topArtists)}
                    >
                        {timeRangeTrans[term]}
                    </ListGroupItem>
                )}
            </ListGroup>
        </>
    );
};

export default TopItemPicker;