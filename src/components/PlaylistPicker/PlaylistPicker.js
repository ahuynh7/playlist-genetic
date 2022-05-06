import { useContext, useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import PlaylistCard from "./PlaylistCard";
import { MenuContainer } from "./PlaylistPicker.styles";
import { usePreventBodyScroll } from "../../hooks/usePreventBodyScroll";


const PlaylistPicker = () => {
    const {graphType, mapTrackList} = useContext(MainContext);
    const {disableScroll, enableScroll} = usePreventBodyScroll();
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

    return (
        <MenuContainer onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            <ScrollMenu
                onWheel={({scrollPrev, scrollNext}, event) => {
                    if (event.deltaY < 0) {
                        scrollPrev();
                    
                    } else if (event.deltaY > 0) {
                        scrollNext();
                    }
                }}
            >
                {Object.values(playlists).map(playlist => 
                    <PlaylistCard
                        itemId={playlist.id}
                        key={playlist.id}
                        playlist={playlist}
                        onClick={handleCardClick(playlist.id)}
                    /> 
                )}
            </ScrollMenu>
        </MenuContainer>
        
    );
};

export default PlaylistPicker;