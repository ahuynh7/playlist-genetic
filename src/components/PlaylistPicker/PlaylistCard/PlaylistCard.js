import { useContext } from "react";

import { MainContext } from "../../Main/Main";
import { Card, LoadingOverlay, PlaylistImage, PlaylistTitle } from "./PlaylistCard.styles";

const PlaylistCard = ({playlist, selected, ...onClick}) => {
    const {isLoading} = useContext(MainContext);
    
    return (
        <LoadingOverlay
            classNamePrefix="card_"
            fadeSpeed={420}
            active={isLoading && selected}
            selected={selected && !isLoading}
            text="Mapping tracks..."
        >
            <Card {...onClick}>
                <PlaylistImage src={playlist.images[0]?.url} />
                <PlaylistTitle>{playlist.name}</PlaylistTitle>
            </Card>
        </LoadingOverlay>
    );
};

export default PlaylistCard;