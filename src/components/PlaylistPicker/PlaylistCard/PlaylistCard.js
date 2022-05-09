import { useContext } from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";

import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { MainContext } from "../../Main/Main";
import { LoadingOverlay, PlaylistImage, PlaylistTitle } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist, onClick, selected}) => {
    const {isLoading} = useContext(MainContext);

    return (
        <LoadingOverlay active={isLoading && selected} selected={selected && !isLoading}>
            <div onClick={onClick}>
                <PlaylistImage src={playlist.images[0].url} />
                <PlaylistTitle>{playlist.name}</PlaylistTitle>
            </div>
            
        </LoadingOverlay>
    );
};

export default PlaylistCard;