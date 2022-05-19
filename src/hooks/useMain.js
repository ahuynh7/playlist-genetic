import { useCallback, useMemo, useRef, useState } from "react";

const useMain = () => {
    const [map, setMap] = useState({});
    const [isLoading, setIsLoading] = useState(null);
    const [feature, setFeature] = useState("popularity");       //default feature is popularity
    const [sliderValue, setSliderValue] = useState(0);
    const graphType = useRef(null);
    
    const digestTrack = content => ({
        id: content.id,
        name: content.name,
        artist: content.artists[0].name,      //selects main artist of track
        album: content.album.name,
        image: content.album.images[2],      //smallest image 64x64
        external_urls: {
            track: content.external_urls,
            artist: content.artists[0].external_urls,
            album: content.album.external_urls,
        }
    });

    //function to map frequencies of an item's trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = {};

        for (let content of Object.values(trackList)) {
            //handles error where features did not load into a track, for some reason
            let featureValue = content[feature] ? content[feature].toFixed(2) : 0;
            
            //remove decimals if feature are these types.  some causes data bars to be miniscule
            if (
                feature === "popularity"
                || feature === "tempo"
                || feature === "loudness"
            ) featureValue = Math.round(featureValue);

            //handles forming the map.  also stores select track metadata
            if (tempMap[featureValue]) {
                tempMap[featureValue].freq++;
                tempMap[featureValue].tracks.push(digestTrack(content));
                
            } else {      //default
                tempMap[featureValue] = {
                    freq: 1,
                    tracks: [digestTrack(content)],
                };
            }
        }

        //sort map by increasing feature index order
        setMap(Object.fromEntries(Object.entries(tempMap)
            .sort(([a,], [b,]) => a - b)
        ));
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

    return {
        chartMapper, 
        dataMapper, 
        feature, 
        graphType,
        isLoading, 
        mapTrackList,
        setIsLoading, 
        setFeature,
        setSliderValue,
        sliderValue
    };
};

export default useMain;