// import { useContext } from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { Card, PlaylistImage, PlaylistTitle } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist, onClick}) => {

    return (
        <Card onClick={onClick}>
            <PlaylistImage src={playlist.images[0].url} />
            <PlaylistTitle>{playlist.name}</PlaylistTitle>
        </Card>
    );
};

export default PlaylistCard;