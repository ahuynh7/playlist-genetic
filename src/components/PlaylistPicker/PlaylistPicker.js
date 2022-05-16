import { useContext, useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import PlaylistCard from "./PlaylistCard";
import { PlaylistPickerWrapper } from "./PlaylistPicker.styles";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import { ItemsLabel } from "../TopItemPicker/TopItemPicker.styles";

const PlaylistPicker = () => {
    const {graphType, map, mapTrackList} = useContext(MainContext);
    const playlistTrackFetch = usePlaylistTracksFetch();
    const playlists = useUserPlaylistFetch();
    const [selected, setSelected] = useState("");
    
    const handleCardClick = playlistId => () => {
        graphType.current = graphTypeEnum.playlists;

        playlistTrackFetch(playlistId);
        setSelected(playlistId);
    };

    //useEffect here handles playlist changes
    useEffect(() => {
        if (playlists[selected]?.analysis && (graphType.current === graphTypeEnum.playlists))
            mapTrackList(playlists[selected].tracks.items);
        
    }, [graphType, mapTrackList, playlists, selected]);

    //resets selected playlist if user selects top item
    useEffect(() => {
        if (graphType.current !== graphTypeEnum.playlists) setSelected("");

    }, [graphType, map]);

    return (
        <PlaylistPickerWrapper>
            <ItemsLabel>Playlists</ItemsLabel>
            <ScrollMenu>
                {Object.values(playlists).map(playlist => 
                    <PlaylistCard
                        itemId={playlist.id}
                        key={playlist.id}
                        playlist={playlist}
                        selected={playlist.id === selected}
                        onClick={handleCardClick(playlist.id)}
                    /> 
                )}
            </ScrollMenu>
            <PlaylistHeader {...playlists[selected]} />
        </PlaylistPickerWrapper>
    );
};

export default PlaylistPicker;