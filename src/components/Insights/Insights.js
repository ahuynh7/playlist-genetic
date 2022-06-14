import { useContext, useEffect, useState } from "react";
import { Range } from "react-range";

import { MainContext } from "../Main/Main";
import { InsightsDescription, InsightsLabel, InsightsWrapper, Thumb, Track } from "./Insights.styles";
import InsightsGrid from "./InsightsGrid";

const featureDescription = {
    acousticness: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.",
    danceability: "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.",
    energy: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.",
    instrumentalness: "Predicts whether a track contains no vocals. \"Ooh\" and \"aah\" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly \"vocal\". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.",
    liveness: "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.",
    loudness: "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.",
    popularity: "The popularity of a track is a value between 0 and 100, with 100 being the most popular.  Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past.",
    speechiness: "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.",
    tempo: "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."
};

const GraphInsights = () => {
    const {dataMapper, feature, setSliderValue, sliderValue} = useContext(MainContext);
    const [selected, setSelected] = useState({});
    const [bufferValue, setBufferValue] = useState(sliderValue);
    
    const getInsight = () => {
        switch (feature) {
            case "loudness":
                return `${feature}: ${selected ? selected.value : 0} db`;

            case "tempo":
                return `${feature}: ${selected ? selected.value : 0} bpm`;

            default:
                return `${feature} Index: ${selected ? selected.value : 0}`;
        }
    };

    //debounce the buffer slider change effect to display the graph insight
    useEffect(() => {
        const timer = setTimeout(() => {
            setSelected(Object.values(dataMapper)[bufferValue]);
        }, 222);

        return () => clearTimeout(timer);
    }, [dataMapper, bufferValue]);

    //renders new grid if data was selected from graph
    useEffect(() => {
        setBufferValue(sliderValue);
        setSelected(Object.values(dataMapper)[sliderValue]);
    }, [dataMapper, sliderValue]);
    
    //reset slider value if feature or mapping has changed
    useEffect(() => {
        setBufferValue(0);        //setting the buffer value to the first value possible
    }, [dataMapper]);

    //waits for data to mount and derenders if playlist is empty
    return (Object.keys(dataMapper).length !== 0 && 
        <InsightsWrapper>
            {/* add units if feature is tempo or loudness */}
            <InsightsLabel>{`${getInsight()}`}</InsightsLabel>
            <InsightsDescription>{featureDescription[feature]}</InsightsDescription>
            <Range
                min={0}
                max={Object.keys(dataMapper).length - 1}
                values={[bufferValue]}
                onChange={value => setBufferValue(value[0])}
                onFinalChange={value => setSliderValue(value[0])}
                renderTrack={({props, children}) => 
                    <Track {...props}>
                        {children}
                    </Track>
                }
                renderThumb={({props}) => 
                    <Thumb {...props} />
                }
            />
            <InsightsGrid tracks={selected?.tracks} />
        </InsightsWrapper>
    );
};

export default GraphInsights;