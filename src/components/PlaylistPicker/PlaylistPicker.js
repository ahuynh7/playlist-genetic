import { useContext, useEffect, useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { Fade } from "react-bootstrap";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import PlaylistCard from "./PlaylistCard";
import { PlaylistPickerWrapper, PlaylistToast } from "./PlaylistPicker.styles";
import PlaylistHeader from "../PlaylistHeader/PlaylistHeader";
import { ItemsLabel } from "../TopItemPicker/TopItemPicker.styles";

const PlaylistPicker = () => {
    const {graphType, chartMapper, mapTrackList} = useContext(MainContext);
    const playlistTrackFetch = usePlaylistTracksFetch();
    const playlists = useUserPlaylistFetch();
    const [selected, setSelected] = useState("");

    const handleCardClick = playlistId => () => {
        graphType.current = graphTypeEnum.playlists;

        playlistTrackFetch(playlistId);
        setSelected(playlistId);
    };

    //handles playlist changes
    useEffect(() => {
        if (playlists[selected]?.analysis && (graphType.current === graphTypeEnum.playlists))
            mapTrackList(playlists[selected].tracks.items);
        
    }, [graphType, mapTrackList, playlists, selected]);

    //resets selected playlist if user selects top item
    useEffect(() => {
        if (graphType.current !== graphTypeEnum.playlists) setSelected("");

    }, [graphType, chartMapper]);

    return (
        <Fade in={Object.keys(playlists).length > 0} mountOnEnter>
            <PlaylistPickerWrapper>
                <ItemsLabel>Playlists ({Object.keys(playlists).length})</ItemsLabel>
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
                <Fade in={selected === ""}>
                    <PlaylistToast selected={selected !== ""}>
                        <TiArrowSortedUp size={20} />
                        <h4>Select a playlist to get started!</h4>
                    </PlaylistToast>
                </Fade>
                <PlaylistHeader {...playlists[selected]} />
            </PlaylistPickerWrapper>
        </Fade>
    );
};

export default PlaylistPicker;