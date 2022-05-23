import { createContext} from "react";
import { Collapse } from "react-bootstrap";
import GraphInsights from "../Insights";
import useMain from "../../hooks/useMain";

import Graph from "../Graph";
import FeaturesDropdown from "../Graph/FeaturesDropdown";
import PlaylistPicker from "../PlaylistPicker";
//import TopItemPicker from "../TopItemPicker";

export const graphTypeEnum = {
    topTracks: "topTracks",
    topArtists: "topArtists",
    playlists: "playlists"
};

export const MainContext = createContext();

const Main = () => {
    const contextPackage = useMain();

    return (
        <MainContext.Provider value={contextPackage}>
            {/*<TopItemPicker /> temporarily disabled for quota extension approval*/}
            <PlaylistPicker />
            <Collapse 
                in={contextPackage.isLoading !== null}
                mountOnEnter
                timeout={1322}
            >
                <div>
                    <FeaturesDropdown />
                    <Graph />
                    <GraphInsights />
                </div>
            </Collapse>
        </MainContext.Provider>
    );
};

export default Main;