import { Icon } from "./Spotify.styles";

const SpotifyIcon = ({color="Black", height}) => {
    return (
        <Icon src={`Spotify_Icon_RGB_${color}.png`} height={height} />
    );
};

export default SpotifyIcon;