// import { useContext } from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { Card, PlaylistImage } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist, onClick}) => {

    return (
        <Card onClick={onClick}>
            <PlaylistImage src={playlist.images[0].url} />
            {playlist.name}
        </Card>
    );
};

export default PlaylistCard;