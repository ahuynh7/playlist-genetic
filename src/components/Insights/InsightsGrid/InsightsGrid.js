import { BsDot } from "react-icons/bs";
import { SpotifyIcon } from "../../Spotify";

import { TrackImage, InsightsGridCard, InsightsGridContent, TrackName, TrackReference } from "../InsightsGrid/InsightsGrid.styles";

const InsightsGrid = ({tracks}) => {
    
    return (
        <InsightsGridContent>
            {tracks?.map((track, i) => 
                <InsightsGridCard key={i}>
                    <TrackImage {...track.image} src={track.image.url}
                        onClick={() => window.open(track.external_urls.track.spotify)}
                    />
                    <div id="details">
                        <TrackName onClick={() => window.open(track.external_urls.track.spotify)}>
                            {track.name}
                        </TrackName>
                        <div id="references">
                            <TrackReference id="artist_ref" onClick={() => window.open(track.external_urls.artist.spotify)}>
                                {track.artist}
                            </TrackReference>
                            <BsDot id="dot" size={16} />
                            <TrackReference id="album_ref" onClick={() => window.open(track.external_urls.album.spotify)}>
                                {track.album}
                            </TrackReference>
                        </div>
                    </div>
                    <SpotifyIcon height={21} />
                </InsightsGridCard>
            )}
        </InsightsGridContent>
    );
};

export default InsightsGrid;