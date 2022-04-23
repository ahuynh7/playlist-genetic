import { Table } from "react-bootstrap";
import { useUserFetch, useUserPlaylistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

const Main = () => {
    const user = useUserFetch();
    const playlists = useUserPlaylistFetch();
    const topTracks = useUserTopTrackFetch('short_term');

    //createContext in this component
    //console.log(topTracks);
    return (
        <>
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
        </>
    );
};

export default Main;