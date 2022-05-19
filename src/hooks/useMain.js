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

        for (let [track, content] of Object.entries(trackList)) {
            //handles error where features did not load into a track, for some reason
            let featureValue = Number(content[feature] ? content[feature].toFixed(2) : 0);
            
            //remove decimals if feature are these types.  causes data bars to be miniscule
            if (feature === "tempo" || feature === "loudness") featureValue = Math.round(featureValue);

            //handles forming the map.  also stores select track metadata
            if (tempMap[featureValue]) {
                tempMap[featureValue].freq++;
                tempMap[featureValue].tracks.push({
                    id: track,
                    name: content.name,
                    image: content.album.images[2],      //smallest image 64x64
                    external_urls: content.external_urls
                });
                
            } else {      //default
                tempMap[featureValue] = {
                    freq: 1,
                    tracks: [{
                        id: track,
                        name: content.name,
                        image: content.album.images[2],      //smallest image 64x64
                        external_urls: content.external_urls
                    }],
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
            tracks: map[e].tracks
        }))
    , [map]);

    return {chartMapper, dataMapper, feature, graphType, isLoading, mapTrackList, setIsLoading, setFeature};
};

export default useMain;