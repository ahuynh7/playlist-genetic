import { createContext, useCallback, useRef, useState } from "react";

import Graph from "../Graph/Graph";
import PlaylistPicker from "../PlaylistPicker";
import TopItemPicker from "../TopItemPicker";

export const graphTypeEnum = {
    topItems: "topItems",
    playlists: "playlists"
};

export const MainContext = createContext();

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [feature, setFeature] = useState("popularity");       //default feature is popular
    const [map, setMap] = useState({});
    const graphType = useRef(null);
    
    //function to map frequencies of an item"s trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = {};

        for (let track in trackList) {
            let dataPoint = Number(trackList[track][feature].toFixed(2));
            
            //remove decimals if feature are these types.  causes data bars to be miniscule
            if (feature === "tempo" || feature === "loudness") dataPoint = Math.round(dataPoint);

            if (tempMap[dataPoint]) {
                tempMap[dataPoint]++;
            }
            else {
                tempMap[dataPoint] = 1;
            }
        }
        
        setMap(tempMap);
        setIsLoading(false);

    }, [feature]);

    const contextPackage = {
        feature, graphType, isLoading, map, mapTrackList, setIsLoading, setFeature
    };

    return (
        <MainContext.Provider value={contextPackage}>
            <TopItemPicker />
            <p>playlists</p>
            <PlaylistPicker />
            <Graph />
        </MainContext.Provider>
    );
};

export default Main;