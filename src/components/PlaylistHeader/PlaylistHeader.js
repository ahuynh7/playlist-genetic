import { RiExternalLinkLine } from "react-icons/ri";

import { PlaylistHeaderWrapper } from "./PlaylistHeader.styles";

const PlaylistHeader = playlist => {
    const handleHeaderClick = () => window.open(playlist.external_urls.spotify);
    
    //renders if playlist has been selected
    return (Object.keys(playlist).length !== 0 &&
        <PlaylistHeaderWrapper>
            <div>
                <h2 id="header_title" onClick={handleHeaderClick}>
                    {playlist.name}
                </h2>
                <RiExternalLinkLine id="header_extLink" size={18} onClick={handleHeaderClick} />
            </div>
            <p id="header_desc">{playlist.description}</p>
        </PlaylistHeaderWrapper>
    );
};

export default PlaylistHeader;