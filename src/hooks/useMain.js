import { useCallback, useMemo, useRef, useState } from "react";

const useMain = () => {
    const [map, setMap] = useState({});
    const [isLoading, setIsLoading] = useState(null);
    const [feature, setFeature] = useState("popularity");       //default feature is popularity
    const graphType = useRef(null);
    
    //function to map frequencies of an item's trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = {};

        for (let track in trackList) {
            //handles error where features did not load into a track, for some reason
            let featureValue = Number(trackList[track][feature] ? trackList[track][feature].toFixed(2) : 0);
            
            //remove decimals if feature are these types.  causes data bars to be miniscule
            if (feature === "tempo" || feature === "loudness") featureValue = Math.round(featureValue);

            //handles forming the map.  also stores select track metadata
            if (tempMap[featureValue]) {
                tempMap[featureValue].freq++;
                tempMap[featureValue].ids.push(track);
                
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

    const chartMapper = useMemo(() => 
        Object.keys(map)?.map(e => ({
            value: e, 
            freq: map[e].freq
        }))
    , [map]);

    const dataMapper = useMemo(() => 
        Object.keys(map)?.map(e => ({
            value: e, 
            freq: map[e].freq,
            ids: map[e].ids
        }))
    , [map]);

    return {chartMapper, dataMapper, feature, graphType, isLoading, mapTrackList, setIsLoading, setFeature};
};

export default useMain;