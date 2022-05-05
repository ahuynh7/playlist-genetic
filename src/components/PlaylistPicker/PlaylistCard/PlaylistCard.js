import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { usePlaylistTracksFetch } from "../../../hooks/usePlaylist";
import { graphTypeEnum, MainContext } from "../../Main/Main";
import { Card, PlaylistImage } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist}) => {
    const {graphType} = useContext(MainContext);
    const {fetchPlaylistTracks} = usePlaylistTracksFetch();
    const x = useContext(VisibilityContext);
    
    const handleCardClick = () => {
        graphType.current = graphTypeEnum.playlists;

        fetchPlaylistTracks(playlist.id);
    };

    return (
        <Card
            onClick={handleCardClick}
        >
            <PlaylistImage src={playlist.images[0].url} />
            {playlist.name}
        </Card>
    );
};

export default PlaylistCard;