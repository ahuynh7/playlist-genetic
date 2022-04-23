import { createContext } from "react";
import { Table } from "react-bootstrap";
import { useUserFetch, useUserPlaylistFetch, useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

export const UserContext = createContext();

const Main = () => {
    const user = useUserFetch();
    const playlists = useUserPlaylistFetch();
    const topTracks = useUserTopTrackFetch('short_term');
    const topArtists = useUserTopArtistFetch('short_term');

    const contextPackage = {
        user,
        playlists,
        topTracks,
        topArtists
    };

    console.log(contextPackage);
    return (
        <UserContext.Provider value={contextPackage}>
            <div>welcome {user.display_name}</div>
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists?.map((playlist, i) => 
                        <tr key={i}>
                            <td>{playlist.name}</td>
                            <td>{playlist.description}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </UserContext.Provider>
    );
};

export default Main;