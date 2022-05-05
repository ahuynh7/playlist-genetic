import { useContext, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import PlaylistCard from "./PlaylistCard";
import { MenuContainer } from "./PlaylistPicker.styles";


const PlaylistPicker = () => {
    const {graphType, mapTrackList} = useContext(MainContext);
    const {targetPlaylist} = usePlaylistTracksFetch();
    const playlists = useUserPlaylistFetch();
    
    //useEffect here handles playlist changes
    useEffect(() => {
        console.log(graphType.current)
        if (targetPlaylist?.analysis && (graphType.current === graphTypeEnum.playlists))
            mapTrackList(targetPlaylist.tracks.items);
        
    }, [graphType, mapTrackList, targetPlaylist]);

    return (
        <MenuContainer>
            <ScrollMenu>
                {Object.values(playlists).map(playlist => 
                    <PlaylistCard
                        itemId={playlist.id}
                        key={playlist.id}
                        playlist={playlist}
                    /> 
                )}
            </ScrollMenu>
        </MenuContainer>
        
    );
};

export default PlaylistPicker;