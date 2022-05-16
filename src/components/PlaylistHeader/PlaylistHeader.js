import { PlaylistHeaderWrapper } from "./PlaylistHeader.styles";

const PlaylistHeader = playlist => {
    return (
        <PlaylistHeaderWrapper>
            <h2 onClick={() => window.open(playlist.external_urls.spotify)}>
                {playlist.name}
            </h2>
            <p>{playlist.description}</p>
        </PlaylistHeaderWrapper>
    );
};

export default PlaylistHeader;