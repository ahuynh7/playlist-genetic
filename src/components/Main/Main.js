import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";

import Graph from "../Graph";
import FeaturesDropdown from "../Graph/FeaturesDropdown";
import PlaylistPicker from "../PlaylistPicker";
//import TopItemPicker from "../TopItemPicker";

export const graphTypeEnum = {
    topTracks: "topTracks",
    topArtists: "topArtists",
    playlists: "playlists"
};

export const MainContext = createContext();

const Main = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [feature, setFeature] = useState("popularity");       //default feature is popular
    const [map, setMap] = useState({});
    const graphType = useRef(null);
    
    //function to map frequencies of an item"s trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = {};
        console.log(trackList)

        for (let track in trackList) {
            //handles error where features did not load into a track, for some reason
            let featureValue = Number(trackList[track][feature] ? trackList[track][feature].toFixed(2) : 0);
            
            //remove decimals if feature are these types.  causes data bars to be miniscule
            if (feature === "tempo" || feature === "loudness") featureValue = Math.round(featureValue);

            //handles forming the map.  also stores at most 3 ids in a feature value
            if (tempMap[featureValue] && tempMap[featureValue].ids.length < 3) {
                tempMap[featureValue].freq++;
                tempMap[featureValue].ids.push(track);

            } else if (tempMap[featureValue]) {
                tempMap[featureValue].freq++;
                
            } else {      //default
                tempMap[featureValue] = {
                    freq: 1,
                    ids: [track],
                };
            }
        }
        
        setMap(tempMap);
        setIsLoading(false);

    }, [feature]);

    const dataMapper = useMemo(() => 
        Object.keys(map)?.map(e => ({
            value: e, 
            freq: map[e].freq,
            ids: map[e].ids
        }))
    , [map]);

    const contextPackage = {
        dataMapper, feature, graphType, isLoading, mapTrackList, setIsLoading, setFeature
    };

    return (
        <MainContext.Provider value={contextPackage}>
            {/*<TopItemPicker /> temporarily disabled for quota extension approval*/}
            <PlaylistPicker />
            <Collapse 
                in={isLoading !== null}
                mountOnEnter
                timeout={1322}
            >
                <div>
                    <FeaturesDropdown />
                    <Graph />
                </div>
            </Collapse>
        </MainContext.Provider>
    );
};

export default Main;