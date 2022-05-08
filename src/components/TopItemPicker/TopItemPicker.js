import { useContext, useEffect, useState } from "react";
import { ListGroupItem } from "react-bootstrap";

import { useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";
import { graphTypeEnum, MainContext } from "../Main/Main";
import { ListGroup } from "./TopItemPicker.styles";

const timeRangeTrans = {
    "shortTerm": "4 Weeks",
    "mediumTerm": "6 Months",
    "longTerm": "All Time"
};

const TopItemPicker = () => {
    const {feature, graphType, mapTrackList, setFeature} = useContext(MainContext);
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const [topItem, setTopItem] = useState({});

    const handleTopItemClick = itemList => () => {
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
            <ListGroup horizontal>
                {Object.keys(topTracks).map((term, i) => 
                    <ListGroupItem key={i} action
                        onClick={handleTopItemClick(topTracks[term])}
                    >
                        {timeRangeTrans[term]}
                    </ListGroupItem>
                )}
            </ListGroup>
            <p>top artists</p>
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