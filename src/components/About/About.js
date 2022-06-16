import { Link } from "react-router-dom";
import { FooterLinkWrapper } from "../Footer/Footer.styles";

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
                Playlist Genetic is designed for everyday Spotify users and especially stat nerds who
                want a visual data report on their listening habits. This allows users to view trends,
                skews, or biases of a certain audio feature within their own personal playlists.
            </p>
        </FooterLinkWrapper>
    );
};

export default About;