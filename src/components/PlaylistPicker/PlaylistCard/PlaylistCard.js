import { useContext, useRef } from "react";

import { MainContext } from "../../Main/Main";
import { LoadingOverlay, PlaylistImage, PlaylistTitle } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist, onClick, selected}) => {
    const {isLoading} = useContext(MainContext);


    return (
        <LoadingOverlay
            classNamePrefix="card_"
            spinner
            active={isLoading && selected}
            selected={selected && !isLoading}
        >
                <PlaylistImage src={playlist.images[0].url} onClick={onClick} />
                <PlaylistTitle>{playlist.name}</PlaylistTitle>
        </LoadingOverlay>
    );
};

export default PlaylistCard;