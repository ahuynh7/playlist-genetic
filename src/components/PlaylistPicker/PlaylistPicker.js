import { useContext, useEffect } from "react";
import { FormSelect } from "react-bootstrap";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";

const PlaylistPicker = () => {
    const {graphType, mapTrackList} = useContext(MainContext);
    const {fetchPlaylistTracks, targetPlaylist} = usePlaylistTracksFetch();
    const playlists = useUserPlaylistFetch();

    //useEffect here handles playlist changes
    useEffect(() => {
        if (targetPlaylist?.analysis && (graphType.current === graphTypeEnum.playlists))
            mapTrackList(targetPlaylist.tracks.items);
        
    }, [graphType, mapTrackList, targetPlaylist]);

    return (
        <FormSelect
            onChange={event => {
                graphType.current = graphTypeEnum.playlists;

                fetchPlaylistTracks(event.target.value);
            }}
        >
            <option disabled>select</option>
            {Object.keys(playlists).map((e, i) => 
                <option key={i} value={e}>
                    {playlists[e].name}
                </option>
            )}
        </FormSelect>
    );
};

export default PlaylistPicker;