import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

import { FooterLinkWrapper } from "../Footer/Footer.styles";
import SpotifyIcon from "../Spotify/SpotifyIcon";

const About = () => {
    return (
        <FooterLinkWrapper>
            <Link to="/main">↩ return</Link>
            <h3>About</h3>
            <p>
                The Playlist Genetic app allows users to gain more insight into their Spotify playlists.
                Using Spotify's Web API, the app fetches all of a user's playlists, to which the user can
                then select any they desire to view. Upon selection, a graph will appear mapping
                tracks' audio features and Spotify analytics onto a frequency chart. The user can then
                select which feature they would like to view (i.e. Popularity, Energy, Acousticness,
                etc.), and the chart will dynamically change according to the feature data. If the user
                utilizes the slider below the chart, they can scrub through each data bar within the
                graph and view its respective tracks in a grid format.
            </p>
            <p>
                Playlist Genetic is designed for everyday Spotify users especially stat nerds who
                want a visual data representation on their listening habits. This allows users to view trends,
                skews, or biases of a certain audio feature within their own personal playlists.
            </p>
            <h3>Author</h3>
            <p>Anh Huynh</p>
            <div className="flexRow">
                <MdEmail size={20} 
                    onClick={event => {
                        window.location.href = "mailto:huynhanh8327@gmail.com";
                        event.preventDefault();
                    }}
                />
                <div onClick={() => window.open("https://open.spotify.com/user/lubealot")}>
                    <SpotifyIcon height={18} />
                </div>
                
            </div>
        </FooterLinkWrapper>
    );
};

export default About;