import { Logo } from "./Spotify.styles";

const SpotifyLogo = ({color="Black", height}) => {
    return (
        <Logo src={`Spotify_Logo_RGB_${color}.png`} height={height} />
    );
};

export default SpotifyLogo;